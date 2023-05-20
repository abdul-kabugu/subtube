// @ts-nocheck
import { useQuery } from "@apollo/client";
import { GET_USER_POSTS } from "../graphql/fragments/getUserPosts";
import { SPACE_ID } from "@/assets/constant";

export const useGetUserData = (accountId) =>  {
    const {data : userData, loading : isUserDataLoading, error : isUserDataError} = useQuery(GET_USER_POSTS, {
        variables : {
            "accountByIdId": accountId,
            "where": {
                "space": {
                  "id_eq": SPACE_ID
                }
              }
        }
    })

    return {
        userData,
        isUserDataLoading,
        isUserDataError
    }
}