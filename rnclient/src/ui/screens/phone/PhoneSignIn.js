import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import config from './config';

const PhoneSignIn = () => {
  const [code, setCode] = useState();
  const [confirm, setConfirm] = useState();

  useEffect(() => {
    (async () => {
      if (auth().currentUser) {
        console.log({currentUser: auth().currentUser});
        console.log({userIdToken: await auth().currentUser?.getIdToken()});
        await auth().signOut();
      }
    })();
  }, []);

  const onPhoneGetTokenButtonPress = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        config.phoneNumber,
      );
      console.log({confirmation});
      setConfirm(confirmation);
    } catch (e) {
      console.log({e});
    }
  };

  const onPhoneVerifyButtonPress = async () => {
    if (confirm && code) {
      try {
        const confirmationResult = await confirm.confirm(code);
        console.log({confirmationResult});
        console.log({});
      } catch (e) {
        console.log({e});
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
          onPhoneGetTokenButtonPress();
        }}
        style={{backgroundColor: 'blue', padding: 15, marginBottom: 20}}>
        <Text style={{color: 'white'}}>Get Token</Text>
      </TouchableOpacity>
      <TextInput
        style={{
          backgroundColor: '#F4F4F4',
          width: '80%',
          height: 50,
          marginBottom: 20,
          borderColor: 'black',
          borderWidth: 1,
        }}
        value={code}
        onChangeText={value => setCode(value)}
      />
      <TouchableOpacity
        onPress={() => {
          onPhoneVerifyButtonPress();
        }}
        style={{backgroundColor: 'blue', padding: 15, marginBottom: 20}}>
        <Text style={{color: 'white'}}>Verify</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PhoneSignIn;
