// @ts-nocheck

import { useGetPopulaVideos } from '@/Hooks'
import React from 'react'
import { VideoCard } from '../cards'
import VideoCardSkeleton from '../Loder/VideoCardSkeleton'

export default function Popular() {
    const {data,loading, error} = useGetPopulaVideos()
    console.log("popular videos", data)
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
  </div>
  )
}
