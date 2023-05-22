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
  console.log("amplified videos", data)
  if(data?.accountById?.posts?.length < 1 || !data?.accountById?.posts){
    return(
      <div className='flex items-center justify-center flex-col gap-2'>
        <img src='/img/empty.svg' className='w-[150px] rounded-full' alt='empty image' />
         <h2 className=' font-bold'>No Results Found</h2>
      </div>
    )
  }
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
