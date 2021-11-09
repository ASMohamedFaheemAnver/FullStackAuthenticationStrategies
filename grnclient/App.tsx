import React from 'react';
import {SafeAreaView} from 'react-native';
import GoogleSignIn from './src/google/GoogleSignIn';
import PhoneSignIn from './src/phone/PhoneSignIn';

const App = () => {
  return (
    <SafeAreaView>
      {false && <GoogleSignIn />}
      {true && <PhoneSignIn />}
    </SafeAreaView>
  );
};

export default App;
