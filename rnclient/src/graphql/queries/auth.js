import {gql} from '@apollo/client';

export const GET_ME_QUERY = gql`
  query {
    me {
      name
    }
  }
`;

export const SIGN_IN_QUERY = gql`
  query {
    signIn {
      token
      name
    }
  }
`;
