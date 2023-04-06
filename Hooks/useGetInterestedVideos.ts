import { GET_INTERESTED_VIDEOS } from '@/graphql/fragments/getInterestingVideos'
import {useQuery} from '@apollo/client'

export const useGetInterestedVideos = () =>  {
    const {data, loading, error} = useQuery(GET_INTERESTED_VIDEOS, {
        variables : {
            
                "where": {
                  "AND": [
                    {
                      "space": {
                        "id_eq": "1080"
                      },
                      "body_isNull": false,
                      "image_isNull": false,
                      "title_isNull": false,
                      "upvotesCount_gt": 10,
                      "sharesCount_gt": 10
                    }
                  ]
                }
              
        }
    })

    return {
        data, loading, error
    }
}