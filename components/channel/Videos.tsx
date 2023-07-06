// @ts-nocheck

import React from 'react'
import {VideoCard} from '../cards'
import Image from 'next/image'
export default function Videos({videos}) {
    const filteredPosts = videos?.filter(post => post.hasOwnProperty("image")  && post?.__typename === "Post"     && post.image !== null)
     console.log("videos testing", videos)
   console.log("the filtered posts", filteredPosts)
   if(filteredPosts?.length < 1 || !filteredPosts){
    return(
      <div className='flex items-center justify-center flex-col gap-2'>
        <Image src='/img/empty.svg' className='w-[150px] rounded-full' alt='empty image' width={200} height={200} />
         <h2 className=' font-bold'>No Results Found</h2>
      </div>
    )
  }
  return (
    <div className='flex gap-3 flex-wrap items-center  mt-5 '>
        {filteredPosts?.map((item, i) =>  {

            return(
                <VideoCard key={i}  video ={item}  />
            )
        })}
    </div>
  )
}
