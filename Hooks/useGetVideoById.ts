// @ts-nocheck
import { useQuery } from "@apollo/client";
import { GET_POST_BY_ID } from "../graphql/fragments/getPostById";

export const useGetVideoById = (id) =>  {
    const {data, loading, error}  = useQuery(GET_POST_BY_ID, {
        variables : {
            "postByIdId": id
        }
    })

    return {
        data,
        loading,
        error
    }
}