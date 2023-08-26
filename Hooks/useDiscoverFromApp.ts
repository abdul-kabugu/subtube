// @ts-nocheck
import {useState, useEffect, useContext} from 'react'
import { SPACE_ID } from '../assets/constant'
import {useQuery} from '@apollo/client'
import { GET_POSTS_BY_SPACE_ID } from '../graphql/fragments/getPostsBySpaceId'


  export  const useDiscoverFromApp = () =>  {
   const {data :posts , loading : isPostsLoading, error: isPostsError } = useQuery(GET_POSTS_BY_SPACE_ID, {
    variables : {
        where: {
            "experimental_jsonContains": {
              "appId" : "Frentube_3"
            }
          }
    },
    pollInterval: 500,
   })

   return{
      posts,
    isPostsLoading,
    isPostsError
   }
}

  