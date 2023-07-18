// @ts-nocheck

import React from 'react'
import { useDiscoverStreams } from '@/Hooks'
import { Error } from '../errors'
import { fakeArrayTwo } from '@/assets/constant'
import VideoCardSkeleton from '../Loder/VideoCardSkeleton'
import { LiveVideoCard, VideoCard } from '../cards'
export default function Home() {
    const {posts, isPostsLoading, isPostsError} = useDiscoverStreams()
     console.log("streams posts", posts)
     const filteredPosts = posts?.posts?.filter(post => post.hasOwnProperty("image") && post.image !== null)
     if(isPostsError) {
        return(
          <Error   /> 
        )
      }
    
       if(isPostsLoading){
        return(
         <VideoCardSkeleton  />
        )
       }

  return (
    <div className='flex gap-3 flex-wrap' >
        {filteredPosts?.map((video, i) =>  {
      return(
       <LiveVideoCard key={i} video = {video}     />
)
})}   
    </div>
  )
}
