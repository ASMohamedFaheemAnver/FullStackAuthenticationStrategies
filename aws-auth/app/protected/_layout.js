import { withAuthenticator } from "@aws-amplify/ui-react-native";
import { Slot } from "expo-router";

function ProtectedLayout() {
  return <Slot />;
}

// Ref: https://github.com/aws-amplify/amplify-ui/issues/5134#issuecomment-2045501829, Expo go doesn't support this
// Ref: https://stackoverflow.com/questions/77684213/getting-unknown-an-unknown-error-has-occurred-while-trying-to-signin-using-a
export default withAuthenticator(ProtectedLayout);
