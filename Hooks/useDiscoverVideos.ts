// @ts-nocheck
import {useState, useEffect, useContext} from 'react'
import { SPACE_ID } from '../assets/constant'
import {useQuery} from '@apollo/client'
import { GET_POSTS_BY_SPACE_ID } from '../graphql/fragments/getPostsBySpaceId'


  const  useDiscoverVideos = () =>  {
   const {data : posts , loading : isPostsLoading, error: isPostsError } = useQuery(GET_POSTS_BY_SPACE_ID, {
    variables : {
      where : {
        "space" : {
          
          "id_eq": SPACE_ID
        }
      }
    }
   })

   return{
    posts,
    isPostsLoading,
    isPostsError
   }
}

  export default useDiscoverVideos