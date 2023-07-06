// @ts-nocheck

import { IPFS_GATEWAY } from '@/assets/constant';
import { useTruncateText } from '@/Hooks'
import moment from 'moment';
import Link from 'next/link';
import React from 'react'
import { Tooltip } from 'react-tippy';
// flex-grow flex-shrink w-[300px]  flex gap-2 items-center mb-2 relative
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
        <div className='flex flex-col  border-t-0 sm:max-w-sm w-full rounded-xl h-60 border border-fuchsia-900/50 relative my-2 p-1 font-mono '>
           <img src={`${IPFS_GATEWAY}${post?.image}`} className="w-full h-[75%] object-cover rounded-md"  />
            <div>
               <h1 className='font-semibold leading-5 font-sans text-gray-400 '>{post?.title && shortenTxt(post?.title, 23)}</h1>
               <h2 className='text-sm text-gray-500'>{post?.createdByAccount?.id && shortenTxt(post?.createdByAccount?.id, 8)}</h2>
              <div className='flex gap-3 mt-1'>
              <p className='text-xs '>Likes {post?.upvoteCounts}</p>
              <p className='text-xs '>{duration.humanize().replace("a ", "")} ago</p>
              </div>
            </div>

             
     {post?.kind === "SharedPost" && (
     
     <div className='absolute top-1 left-1 bg-white w-5 h-5 rounded-full flex items-center justify-center'>
        <Tooltip 
     title={`Amplified video`}
     position="right"
     trigger="mouseenter"
     >
       <p className='text-xs'>🔥</p> 
       </Tooltip>
       </div>
       
   )}
        </div>
    </Link>
  )
}
