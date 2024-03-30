import {AsyncStorageKeys} from '@constants/strings';
import {useGetMeQuery, useSignInQuery} from '@graphql/actions/auth/queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import config from './config';

GoogleSignin.configure({
  webClientId: config.webClientId,
});

const GoogleSignIn = () => {
  const user = auth().currentUser;
  const [getMeQuery, {data, error}] = useGetMeQuery();
  // signInQuery will give token on query and we can save it in the storage to query getMeQuery
  // getAuthToken will give jwt token or firebase token to the db, Check it to modify it
  const [signInQuery, {data: signInData}] = useSignInQuery();
  useEffect(() => {
    if (user?.email) {
      console.log({user});
      getMeQuery({});
    }
  }, [user?.email]);

  useEffect(() => {
    signInQuery({});
  }, []);

  useEffect(() => {
    if (data) {
      console.log({data});
    }
  }, [data]);
  useEffect(() => {
    if (signInData) {
      console.log({signInData});
      const token = signInData?.signIn?.token;
      if (token)
        AsyncStorage.setItem(AsyncStorageKeys.authorizationToken, token);
    }
  }, [signInData]);

  const onSignOutPress = async () => {
    try {
      await AsyncStorage.removeItem(AsyncStorageKeys.authorizationToken);
      await auth().signOut();
    } catch (e) {
      console.log({e});
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      console.log({idToken});
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Need to logout from google to let auth handle by firebase
      await GoogleSignin.signOut();
      await auth().signInWithCredential(googleCredential);
      const currentUserIdToken = await auth().currentUser?.getIdToken();
      console.log({currentUserIdToken});
      // await auth().signOut();
      console.log({googleUser: await GoogleSignin.getCurrentUser()});
      console.log({firebaseUser: auth().currentUser});
      // Save token
      // await AsyncStorage.setItem(
      //   AsyncStorageKeys.authorizationToken,
      //   currentUserIdToken,
      // );
    } catch (e) {
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
      {user ? (
        <TouchableOpacity
          onPress={() => {
            onSignOutPress();
          }}
          style={{backgroundColor: 'red', padding: 15}}>
          <Text style={{color: 'white'}}>Google SignOut</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            onGoogleButtonPress();
          }}
          style={{backgroundColor: 'blue', padding: 15}}>
          <Text style={{color: 'white'}}>Google SignIn</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default GoogleSignIn;
