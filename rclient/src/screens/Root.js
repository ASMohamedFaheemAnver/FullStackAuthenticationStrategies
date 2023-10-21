import { useQuery } from "@apollo/client";
import { setAuthToken } from "client";
import { ME_QUERY, SIGN_IN_QUERY } from "graphql/query/auth";
import { ROOT_QUERY } from "graphql/query/root";
import { useEffect } from "react";

const Root = () => {
  const { loading, data } = useQuery(ROOT_QUERY);
  const { data: meData } = useQuery(ME_QUERY);
  // Uncomment if need token
  // const { data: signInQueryData } = useQuery(SIGN_IN_QUERY);
  // useEffect(() => {
  //   const token = signInQueryData?.signIn?.token;
  //   setAuthToken(token);
  // }, [signInQueryData]);
  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div>
      <div>{data?.root?.message}</div>
      <div>{JSON.stringify(meData)}</div>
    </div>
  );
};

export default Root;
