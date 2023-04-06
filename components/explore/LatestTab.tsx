// @ts-nocheck

import { useGetLatestVidoes } from '@/Hooks';
import React from 'react'
import { VideoCard } from '../cards';
import VideoCardSkeleton from '../Loder/VideoCardSkeleton';

export default function LatestTab() {
  // get the current date
const today = new Date();

// calculate the date 3 days ago
const threeDaysAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));

// format the date as a string in the required format
const formattedDate = threeDaysAgo.toISOString();
  const {data, loading, error} = useGetLatestVidoes(formattedDate)
// use the formatted date in your GraphQL query
console.log("formatted date", data); // outp

  if(loading) {
    return(
       <VideoCardSkeleton  />
    )
  }
  return (
    <div className='flex gap-2 flex-wrap'>
      {data?.posts?.map((video, i) =>  {

        return(
          <VideoCard  key={i} video={video} />
        )
      })}
    </div>
  )
}
