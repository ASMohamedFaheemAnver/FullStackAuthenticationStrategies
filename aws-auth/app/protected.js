import { router } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

const Protected = () => {
    return (
        <View>
            <Text>Protected route</Text>
            <Button title="Back to home" onPress={() => router.back()}></Button>
        </View>
    );
};

export default Protected;
