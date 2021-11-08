import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import React from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import config from './config';

GoogleSignin.configure({
  webClientId: config.webClientId,
});

const GoogleSignIn = () => {
  const onGoogleButtonPress = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      console.log({idToken});
      const googleCredential = await auth.GoogleAuthProvider.credential(
        idToken,
      );
      auth().signInWithCredential(googleCredential);
      const currentUserIdToken = await auth().currentUser?.getIdToken();
      console.log({currentUserIdToken});

      const res = await axios.get(config.baseUrl, {
        headers: {
          Authorization: `Bearer ${currentUserIdToken}`,
        },
      });
      console.log({res});
      await auth().signOut();
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
  );
};

export default GoogleSignIn;
