// @ts-nocheck

import { GET_LATEST_VIDEOS } from '@/graphql/fragments/getLatestVideos'
import {useQuery} from '@apollo/client'

export const useGetLatestVidoes = (timeQuey) =>  {
    const {data, loading, error} = useQuery(GET_LATEST_VIDEOS, {
        variables : {
            
                "where": {
                  "AND": [
                    {
                      "space": {
                        "id_eq": "1080"
                      },
                      "createdAtTime_gt": "2023-03-30T09:47:18.650Z",
                      "body_isNull": false,
                      "image_isNull": false,
                      "title_isNull": false
                    }
                  ]
                }
              
        }
    })

    return {
  data, loading, error
    }
}