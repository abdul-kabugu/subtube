// @ts-nocheck

import { useDiscoverTrendingVideos } from '@/Hooks/useDiscoverTrendingVideos'
import React from 'react'
import { VideoCard } from '../cards'
import { Error } from '../errors'
import VideoCardSkeleton from '../Loder/VideoCardSkeleton'

export default function TrendingTab() {
    const {data, error, loading} = useDiscoverTrendingVideos()
  
   if(error) {
    return(
      <Error  />
    )
   }
     if(loading){
        return(
            <VideoCardSkeleton  />
        )
     }
  return (
    <div className='flex gap-2 '>
   {data?.posts?.map((vid, i) =>  {
    return(
        <VideoCard  key={i} video = {vid} />
    )
   })}

</div>     
  )
}
