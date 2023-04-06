// @ts-nocheck

import { useGetAmplifiedVideos } from '@/Hooks/useGetAmplifiedVideos'
import { useRouter } from 'next/router'
import React from 'react'
import { VideoCard } from '../cards'

export default function Amplified() {
  const router = useRouter()
  const channelId =  router.query.channelId
  const {data, loading, error} = useGetAmplifiedVideos(channelId)
   console.log("amplified videos", data)
  return (
    <div className='flex gap-2 mt-4'>
        {data?.accountById?.posts.map((video, i) =>  {

          return(
             <VideoCard  key={i} video={video}     />

          )
        })}

        
    </div>
  )
}
