import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { Kind, OperationTypeNode } from "graphql";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

// Global error handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) console.error(networkError);
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.error(message));
});

// Graphql server link
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_HTTP_SERVER_URI,
});

// Subscription config
const client = new SubscriptionClient(
  process.env.REACT_APP_GRAPHQL_WS_SERVER_URI,
  {
    reconnect: true,
    minTimeout: 55000, // Timeout connection in 55s and reconnect again.
  }
);

// Subscription link
const wsLink = new WebSocketLink(client);

export const getAuthToken = async () => {
  const token = localStorage.getItem("token");
  return token;
};

export const setAuthToken = async (token) => {
  localStorage.setItem("token", token);
  return true;
};

// Attach auth token on each http request
const authLink = setContext(async (_, { headers }) => {
  const token = await getAuthToken();
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

// Combined client
const apolloClient = new ApolloClient({
  // link: authLink.concat(httpLink),
  // Splitting request between http and ws
  link: split(
    ({ query }) => {
      const def = getMainDefinition(query);
      return (
        def.kind === Kind.OPERATION_DEFINITION &&
        def.operation === OperationTypeNode.SUBSCRIPTION
      );
    },
    // Need to uncomment to make it work
    wsLink,
    ApolloLink.from([errorLink, authLink, httpLink])
  ),
  // Cache uses ram memory, so that I hope it will be wiped on restart
  cache: new InMemoryCache({}),
});

export default apolloClient;
