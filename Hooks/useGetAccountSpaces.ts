// @ts-nocheck
import { GET_ACCOUNT_SPACES } from "@/graphql/fragments/getAccountSpaces";
import { useQuery } from "@apollo/client";


export const useGetAccountSpaces = (accountId) => {
  const {data, loading, error} = useQuery(GET_ACCOUNT_SPACES, {
    variables : {
        "where": {
            "createdByAccount": {
              "id_eq": accountId
            }
          }
    }
  })

  return {
    data, loading, error
  }
}