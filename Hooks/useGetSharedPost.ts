// @ts-nocheck
import {useQuery} from '@apollo/client'
import { GET_SHARED_POSTS } from '../graphql/fragments/getSharedPosts'


export const useGetSharedPosts = (accountId) =>  {
  const {data : sharedPosts, loading: isSharedPostsLoading, error: isSharedPostsError} = useQuery(GET_SHARED_POSTS, {
    variables : {
        "where": {
            "kind_eq": "SharedPost",
            "AND": [
              {
                "createdByAccount": {
                  "id_eq": accountId
                },
                
              }
            ]
          }
        }

        
    }
  )

  return {
    sharedPosts,
    isSharedPostsLoading,
    isSharedPostsError

}
}