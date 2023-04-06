import { GET_TRENDING_VIDEOS } from '@/graphql/fragments/geTrendingVideos'
import {useQuery} from '@apollo/client'

export const useGetPopulaVideos = () =>  {
  const {data, loading, error} = useQuery(GET_TRENDING_VIDEOS, {
    variables : {
      
        "where": {
          "AND": [
            {
              "upvotesCount_gt": 10,
              "space": {
                "id_eq": "1080"
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