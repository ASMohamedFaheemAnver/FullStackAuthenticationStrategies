import {ApolloProvider} from '@apollo/client';
import apolloClient from '@graphql/apollo';
import LanguageProvider from '@providers/LanguageProvider';
import {NavigationContainer} from '@react-navigation/native';
import {persistor, store} from '@redux/store';
import {useTheme} from '@theme';
import MainStack from '@ui/navigations/MainStack';
import {ModalPortal} from 'react-native-modals';
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  const {theme} = useTheme();
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* In order to make toast work after react-native 0.62 */}
        <RootSiblingParent>
          <LanguageProvider loading={null}>
            <NavigationContainer theme={theme}>
              <ApolloProvider client={apolloClient}>
                <MainStack />
                {/*Make Dialog Box Work */}
                <ModalPortal />
              </ApolloProvider>
            </NavigationContainer>
          </LanguageProvider>
        </RootSiblingParent>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
