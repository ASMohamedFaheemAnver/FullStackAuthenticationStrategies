import {getProfile, NaverLogin} from '@react-native-seoul/naver-login';
import React from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import config from './config';

const NaverSignIn = () => {
  const onNaverButtonPress = async () => {
    NaverLogin.login(
      {
        ...config,
      },
      async (err, token) => {
        if (token) {
          const user = await getProfile(token.accessToken);
          console.log({user});
        }
      },
    );
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
          onNaverButtonPress();
        }}
        style={{backgroundColor: 'blue', padding: 15}}>
        <Text style={{color: 'white'}}>Naver SignIn</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NaverSignIn;
