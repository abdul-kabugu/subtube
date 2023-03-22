// @ts-nocheck
import { useQuery } from "@apollo/client";
import { GET_USER_POSTS } from "../graphql/fragments/getUserPosts";


export const useGetUserData = (accountId) =>  {
    const {data : userData, loading : isUserDataLoading, error : isUserDataError} = useQuery(GET_USER_POSTS, {
        variables : {
            "accountByIdId": accountId
        }
    })

    return {
        userData,
        isUserDataLoading,
        isUserDataError
    }
}