// @ts-nocheck

import {useState} from 'react'
import Identicon from 'identicon.js';
import { useTruncateText, useReactions } from '@/Hooks';
import moment from 'moment';
import Link from 'next/link';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';


export default function CommentCard({comment}) {
    const {shortenTxt} = useTruncateText()
    const currentDate = new Date();
    const postCreatedAt = new Date(comment?.createdAtTime);
   const {likePost, deslikePost} = useReactions()
    const diffInMilliseconds = currentDate - postCreatedAt;
    const diffInHours = diffInMilliseconds / (60 * 60 * 1000);
    const duration = moment.duration(diffInHours, 'hours');

    const avatar = new Identicon(comment?.createdByAccount?.id|| "bla blah yhis  is  another  random genetrated icon"        , {
        size: 420, // adjust the size of the avatar as per your requirement
        format: 'svg' // choose the format of the avatar, such as png or svg
      }).toString()
  return (
    <div className='flex gap-3 mb-5'>
        <Link href={`/channels/${comment?.createdByAccount?.id}`}>
      <img  src={`data:image/svg+xml;base64,${avatar}`} className="w-[30px] h-[30px] rounded-full ring-2 object-cover" />
      </Link>
       <div>
          <div className='flex gap-4'>
          <Link href={`/channels/${comment?.createdByAccount?.id}`}>
  <h3 className='text-sm font-semibold text-black/75'>{comment  && shortenTxt(comment?.createdByAccount.id, 10)}</h3>
  </Link>
               <p className='text-xs'>{duration.humanize().replace("a ", "")} ago</p>
          </div>

          <h4 className='text-lg text-black/80'>{comment?.body}</h4>

           <div className='mt-1 flex gap-4'>
              <div className='flex gap-1 cursor-pointer items-center' onClick={() => likePost(comment?.id)}>
                <AiOutlineLike  />
                 <button>Like {comment?.upvotesCount}</button>
              </div>

              <div className='flex gap-1 cursor-pointer items-center' onClick={() => deslikePost(comment?.id)}>
              <AiOutlineDislike  />
                 <button>Like {comment?.upvotesCount}</button>
              </div>
           </div>
       </div>
    </div>
  )
}
