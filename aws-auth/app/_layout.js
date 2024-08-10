import { Slot } from "expo-router";

import { Amplify } from "aws-amplify";
import amplifyconfig from "../src/amplifyconfiguration.json";

Amplify.configure(amplifyconfig);

export default function RootLayout() {
  return <Slot />;
}
