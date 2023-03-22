// @ts-nocheck
import { useQuery } from "@apollo/client";
import { GET_POST_COMMENTS } from "../graphql/fragments/getPostComments";


const useGetPostComments = (id) =>  {
    const { data : postComments, loading : isPostCommentsLoading, error : isPostCommentsError} = useQuery(GET_POST_COMMENTS, {
        variables : {
           where : {
            "kind_eq": "Comment",
            "AND" : {
                "rootPost" : {
                    "id_eq" : id
                  }
            }
           }
        }
    })

    return {
        postComments,
        isPostCommentsLoading,
        isPostCommentsError
    }
}

export default useGetPostComments