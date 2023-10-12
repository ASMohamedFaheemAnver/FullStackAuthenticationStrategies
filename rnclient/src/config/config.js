const Config = {
  graphqlHttpServerUri: '',
  graphqlWsServerUri: '',
};

if (__DEV__) {
  Config.graphqlHttpServerUri = 'http://192.168.1.100:5000/graphql';
  Config.graphqlWsServerUri = 'ws://192.168.1.100:5000/graphql';
}

export default Config;
