// @ts-nocheck

import React from 'react'
import {VideoCard} from '../cards'
export default function Videos({videos}) {
    const filteredPosts = videos?.filter(post => post.hasOwnProperty("image")  && post?.__typename === "Post"     && post.image !== null)
   console.log("the filtered posts", filteredPosts)
  return (
    <div className='flex gap-3 flex-wrap items-center justify-center mt-5 '>
        {filteredPosts?.map((item, i) =>  {

            return(
                <VideoCard key={i}  video ={item}  />
            )
        })}
    </div>
  )
}
