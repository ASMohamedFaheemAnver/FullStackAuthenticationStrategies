import React from 'react';
import {SafeAreaView} from 'react-native';
import GoogleSignIn from './src/google/GoogleSignIn';
import NaverSignIn from './src/naver/NaverSignIn';
import PhoneSignIn from './src/phone/PhoneSignIn';

const App = () => {
  return (
    <SafeAreaView>
      {false && <GoogleSignIn />}
      {false && <PhoneSignIn />}
      {true && <NaverSignIn />}
    </SafeAreaView>
  );
};

export default App;
