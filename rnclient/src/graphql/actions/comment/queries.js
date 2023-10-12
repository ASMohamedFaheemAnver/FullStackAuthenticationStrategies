import {useLazyQuery} from '@apollo/client';
import {GET_ALL_COMMENTS_QUERY} from '@graphql/queries/comment';

export const useGetAllComments = () => useLazyQuery(GET_ALL_COMMENTS_QUERY);
// export const useGetAllComments = (options) => useQuery(GET_ALL_COMMENTS_QUERY, options);
