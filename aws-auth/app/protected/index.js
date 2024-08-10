import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { router } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

const Protected = () => {
  const { signOut } = useAuthenticator();
  return (
    <View>
      <Text>Protected route</Text>
      <Button title="Sign out" onPress={() => signOut()}></Button>
      <Button title="Back to home" onPress={() => router.back()}></Button>
    </View>
  );
};

export default Protected;
