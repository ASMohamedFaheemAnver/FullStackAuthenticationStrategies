import {useLazyQuery} from '@apollo/client';
import {GET_ALL_COMMENTS_QUERY} from '@graphql/queries/auth';

export const useGetAllComments = () => useLazyQuery(GET_ALL_COMMENTS_QUERY);
