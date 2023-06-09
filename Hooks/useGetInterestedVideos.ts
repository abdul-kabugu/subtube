import { GET_INTERESTED_VIDEOS } from '@/graphql/fragments/getInterestingVideos'
import {useQuery} from '@apollo/client'
import { SPACE_ID } from '@/assets/constant'
export const useGetInterestedVideos = () =>  {
    const {data, loading, error} = useQuery(GET_INTERESTED_VIDEOS, {
        variables : {
            
                "where": {
                  "AND": [
                    {
                      "space": {
                        "id_eq": SPACE_ID
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