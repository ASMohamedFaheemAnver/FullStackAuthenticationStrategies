import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React from 'react';
import {SafeAreaView, ScrollView, Text, TouchableOpacity} from 'react-native';
import webClientId from './config';

GoogleSignin.configure({
  webClientId: webClientId,
});

const App = () => {
  const onGoogleButtonPress = async () => {
    try {
      const res = await GoogleSignin.signIn();
      console.log({res});
    } catch (e: any) {
      console.log({e});
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (e.code === statusCodes.IN_PROGRESS) {
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          minHeight: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            onGoogleButtonPress();
          }}
          style={{backgroundColor: 'blue', padding: 15}}>
          <Text style={{color: 'white'}}>Google SignIn</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
