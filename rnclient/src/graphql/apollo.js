import {ApolloClient, ApolloLink, InMemoryCache, split} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import Config from '@config/config';
import {
  AsyncStorageKeys,
  fetchPolicyValues,
  HeaderKeys,
  Patterns,
  ReplaceableTokens,
} from '@constants/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createUploadLink} from 'apollo-upload-client';
import {Kind, OperationTypeNode} from 'graphql';
import {SubscriptionClient} from 'subscriptions-transport-ws';

// Graphql server link
const httpLink = createUploadLink({
  uri: Config.graphqlHttpServerUri,
});

// Subscription config
const client = new SubscriptionClient(
  /*APOLLO_WS_URL*/ Config.graphqlWsServerUri,
  {
    reconnect: true,
    minTimeout: 55000,
  },
);

// Return stored auth token
const getAuthToken = async () => {
  const token = await AsyncStorage.getItem(AsyncStorageKeys.authorizationToken);
  return token;
};

// Attach auth token on each ws request
client.use([
  {
    async applyMiddleware(operationOptions, next) {
      operationOptions.variables[HeaderKeys.authorization] =
        Patterns.authorizationHeader.replace(
          ReplaceableTokens.bearerToken,
          await getAuthToken(),
        );
      next();
    },
  },
]);

// Subscription link
const wsLink = new WebSocketLink(client);

// Attach auth token on each http request
const authLink = setContext(async (_, {headers}) => {
  return {
    headers: {
      ...headers,
      [HeaderKeys.authorization]: Patterns.authorizationHeader.replace(
        ReplaceableTokens.bearerToken,
        await getAuthToken(),
      ),
    },
  };
});

// Global error handling
const errorLink = onError(({graphQLErrors, networkError}) => {
  if (networkError) console.error(networkError);
  if (graphQLErrors) graphQLErrors.map(({message}) => console.error(message));
});

// Combined client
const apolloClient = new ApolloClient({
  // link: authLink.concat(httpLink),
  // Splitting request between http and ws
  link: split(
    ({query}) => {
      const def = getMainDefinition(query);
      return (
        def.kind === Kind.OPERATION_DEFINITION &&
        def.operation === OperationTypeNode.SUBSCRIPTION
      );
    },
    // Need to uncomment to make it work
    // wsLink,
    ApolloLink.from([errorLink, authLink, httpLink]),
    ApolloLink.from([errorLink, authLink, httpLink]),
  ),
  // Cache uses ram memory, so that I hope it will be wiped on restart
  cache: new InMemoryCache({}),
  // Need to remove
  defaultOptions: {
    watchQuery: {fetchPolicy: fetchPolicyValues.noCache},
    query: {fetchPolicy: fetchPolicyValues.noCache},
    mutate: {fetchPolicy: fetchPolicyValues.noCache},
  },
});

export default apolloClient;
