// @ts-nocheck

import { IPFS_GATEWAY } from '@/assets/constant';
import { useTruncateText } from '@/Hooks'
import moment from 'moment';
import Link from 'next/link';
import React from 'react'
import { Tooltip } from 'react-tippy';

export default function RelatedVidCard({post}) {
    console.log("all posts", post)
  
    const {shortenTxt} = useTruncateText()
    const currentDate = new Date();
    const postCreatedAt = new Date(post?.createdAtTime);
    const diffInMilliseconds = currentDate - postCreatedAt;
const diffInHours = diffInMilliseconds / (60 * 60 * 1000);
const duration = moment.duration(diffInHours, 'hours');
  return (
    <Link href={`/watch/${post?.id}`} className="">
        <div className='flex-grow flex-shrink w-[300px]  flex gap-2 items-center mb-2 relative '>
           <img src={`${IPFS_GATEWAY}${post?.image}`} className="w-[50%] h-[100px] object-cover rounded-md"  />
            <div>
               <h1 className='font-semibold leading-5 font-sans '>{post?.title && shortenTxt(post?.title, 13)}</h1>
               <h2 className='text-sm'>{post?.createdByAccount?.id && shortenTxt(post?.createdByAccount?.id, 8)}</h2>
              <div className='flex gap-3 mt-2'>
              <p className='text-xs text-black/70'>Likes {post?.upvoteCounts}</p>
              <p className='text-xs text-black/70'>{duration.humanize().replace("a ", "")} ago</p>
              </div>
            </div>

             
     {post?.kind === "SharedPost" && (
     
     <div className='absolute top-1 left-1 bg-white w-5 h-5 rounded-full flex items-center justify-center'>
        <Tooltip 
     title={`Amplified video`}
     position="right"
     trigger="mouseenter"
     >
       <p className='text-xs'>⭐️</p> 
       </Tooltip>
       </div>
       
   )}
        </div>
    </Link>
  )
}
