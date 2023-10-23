import { useQuery, useSubscription } from "@apollo/client";
import { setAuthToken } from "client";
import { ME_QUERY, SIGN_IN_QUERY } from "graphql/query/auth";
import { ROOT_QUERY } from "graphql/query/root";
import { SUB_LAST_SEEN_SUBSCRIPTION } from "graphql/subscription/auth";
import { useEffect } from "react";

const Root = () => {
  // const { loading, data } = useQuery(ROOT_QUERY);
  // const { data: meData } = useQuery(ME_QUERY);
  const { data: subLastSeenData, error: subLastSeenError } = useSubscription(
    SUB_LAST_SEEN_SUBSCRIPTION
  );
  // Uncomment if need token
  const { data: signInQueryData } = useQuery(SIGN_IN_QUERY);
  useEffect(() => {
    if (signInQueryData) {
      const token = signInQueryData?.signIn?.token;
      console.log({ token });
      setAuthToken(token);
    }
  }, [signInQueryData]);

  // useEffect(() => {
  //   if (subLastSeenData) {
  //     console.log({ subLastSeenData });
  //   }
  // }, [subLastSeenData]);
  // useEffect(() => {
  //   if (subLastSeenError) {
  //     console.log({ subLastSeenError });
  //   }
  // }, [subLastSeenError]);

  // if (loading) {
  //   return <div>loading</div>;
  // }
  return (
    <div>
      {/* <div>{data?.root?.message}</div> */}
      {/* <div>{JSON.stringify(meData)}</div> */}
    </div>
  );
};

export default Root;
