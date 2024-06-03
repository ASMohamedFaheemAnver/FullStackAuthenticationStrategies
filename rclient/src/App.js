import { ApolloProvider } from "@apollo/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import client from "client";
import FirebaseAndJWTLogin from "screens/FirebaseAndJWTLogin";
import GoogleLogin from "screens/GoogleLogin";

function App() {
  return (
    <ApolloProvider client={client}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        {/* <FirebaseAndJWTLogin /> */}
        <GoogleLogin />
      </GoogleOAuthProvider>
    </ApolloProvider>
  );
}

export default App;
