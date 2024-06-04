import { useLazyQuery } from "@apollo/client";
import { GoogleLogin } from "@react-oauth/google";
import { setAuthToken } from "client";
import { ME_QUERY } from "graphql/query/auth";
import { useEffect } from "react";

const CGoogleLogin = () => {
  const [getMe, { data: meData }] = useLazyQuery(ME_QUERY);

  // useEffect(() => {
  //   getMe();
  // }, []);

  const onGoogleLogin = () => {
    window.open("http://localhost:5000/api/auth/google/login", "_self");
  };

  return (
    <div>
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          setAuthToken(credentialResponse.credential);
          getMe();
        }}
        onError={() => {
          console.log({ msg: "FAILED!" });
        }}
      /> */}
      <button onClick={onGoogleLogin}>Google login</button>
    </div>
  );
};

export default CGoogleLogin;
