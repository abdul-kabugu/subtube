// @ts-nocheck

import React from 'react'
import {VideoCard} from '../cards'
export default function Videos({videos}) {
    const filteredPosts = videos?.filter(post => post.hasOwnProperty("image")  && post?.__typename === "Post"     && post.image !== null)
   console.log("the filtered posts", filteredPosts)
   if(filteredPosts.length < 1){
    return(
      <div className='flex items-center justify-center flex-col gap-2'>
        <img src='/img/empty.svg' className='w-[150px] rounded-full' alt='empty image' />
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
