import React from 'react';
import {SafeAreaView} from 'react-native';
import GoogleSignIn from './src/GoogleSignIn';

const App = () => {
  return (
    <SafeAreaView>
      <GoogleSignIn />
    </SafeAreaView>
  );
};

export default App;
