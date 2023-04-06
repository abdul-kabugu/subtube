// @ts-nocheck

import { useGetInterestedVideos } from '@/Hooks'
import React from 'react'
import { VideoCard } from '../cards'
import VideoCardSkeleton from '../Loder/VideoCardSkeleton'

export default function InterestingTab() {
    const {data, loading, error} = useGetInterestedVideos()
    if(loading){
        return(
            <VideoCardSkeleton  />
        )
    }

     if(data?.posts.length === 0){
        return(
            <p>Data empty</p>
        )
     }
  return (
<div className='flex gap-2 flex-wrap'>
    {data?.posts?.map((video, i) =>  {

        return(
            <VideoCard key={i} video={video} />
        )
    })}
  </div>  )
}
