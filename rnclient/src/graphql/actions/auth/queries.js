import {useLazyQuery} from '@apollo/client';
import {GET_ME_QUERY} from '@graphql/queries/auth';

export const useGetMeQuery = () => useLazyQuery(GET_ME_QUERY);
