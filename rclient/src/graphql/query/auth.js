import { gql } from "@apollo/client";

export const SIGN_IN_QUERY = gql`
  query {
    signIn {
      token
      name
    }
  }
`;
export const ME_QUERY = gql`
  query {
    me {
      name
    }
  }
`;
