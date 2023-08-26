// @ts-nocheck

import { GET_AMPLIFIED_VIDEOS } from '@/graphql/fragments/getAmplifiedVideos'
import {useQuery}  from '@apollo/client'

export const useGetAmplifiedVideos = (accountId) => {
    const {data , loading , error} = useQuery(GET_AMPLIFIED_VIDEOS, {
        variables : {
            "accountByIdId": accountId,
   
  "where": {
    "kind_eq": "SharedPost",
      "image_isNull": false,
        "title_isNull": false
  }
   
        },
        pollInterval: 500,
    })

    return{
        data, loading, error
    }
}