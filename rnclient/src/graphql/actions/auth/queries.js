import {useLazyQuery} from '@apollo/client';
import {GET_ME_QUERY, SIGN_IN_QUERY} from '@graphql/queries/auth';

export const useGetMeQuery = () => useLazyQuery(GET_ME_QUERY);
export const useSignInQuery = () => useLazyQuery(SIGN_IN_QUERY);
