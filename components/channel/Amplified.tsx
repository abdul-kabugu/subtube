// @ts-nocheck

import { useGetAmplifiedVideos } from '@/Hooks/useGetAmplifiedVideos'
import { useRouter } from 'next/router'
import React from 'react'
import { VideoCard } from '../cards'
import VideoCardSkeleton from '../Loder/VideoCardSkeleton'

export default function Amplified() {
  const router = useRouter()
  const channelId =  router.query.channelId
  const {data, loading, error} = useGetAmplifiedVideos(channelId)
  if(loading) {
    return(
       <VideoCardSkeleton  />
    )
  }
  return (
    <div className='flex gap-2 mt-4 '>
        {data?.accountById?.posts.map((video, i) =>  {

          return(
             <VideoCard  key={i} video={video}     />

          )
        })}

        
    </div>
  )
}
