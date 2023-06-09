import { GET_TRENDING_VIDEOS } from '@/graphql/fragments/geTrendingVideos'
import {useQuery} from '@apollo/client'
import { SPACE_ID } from '@/assets/constant'
export const useGetPopulaVideos = () =>  {
  const {data, loading, error} = useQuery(GET_TRENDING_VIDEOS, {
    variables : {
      
        "where": {
          "AND": [
            {
              "upvotesCount_gt": 10,
              "space": {
                "id_eq": SPACE_ID
              },
              "image_isNull": false,
              "body_isNull": false,
              "title_isNull": false
            }
          ]
        }
      
    }
  })

  return{
    data, loading, error
  }
}