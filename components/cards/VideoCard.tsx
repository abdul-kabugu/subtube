// @ts-nocheck

import { IPFS_GATEWAY, IPFS_GATEWAY_TWO } from '@/assets/constant';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react'
import Identicon from 'identicon.js';
import { useTruncateText } from '@/Hooks';
import {RxDotsVertical} from 'react-icons/rx'
export default function VideoCard({video}) {
  const [isDisplayDots, setIsDisplayDots] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentDate = new Date();
  const videoCreatedAt = new Date(video?.createdAtTime);
const {shortenTxt} = useTruncateText()
  const diffInMilliseconds = currentDate - videoCreatedAt;
const diffInHours = diffInMilliseconds / (60 * 60 * 1000);
const duration = moment.duration(diffInHours, 'hours');

const toggleIsDisplayDots = () => {
  isDisplayDots ?  setIsDisplayDots(false) : setIsDisplayDots(true)
} 

const avatarUrl = video?.createdByAccount?.profileSpace?.image
const avatar = new Identicon(video?.createdByAccount?.id || "hellow  world  this  is auto generated avatr", {
  size: 420, // adjust the size of the avatar as per your requirement
  format: 'svg' // choose the format of the avatar, such as png or svg
}).toString()
   console.log("the video", video)
  return (

    <div className='xs:w-96 sm:w-[300px] md:w-[270px] lg:w-[220px] xl:w-[253px] xs:h-[240px]  sm:h-[230px] md:h-[220px] lg:h-[235px] rounded-lg  flex-grow flex-shrink mb-2 py-1 px-1 max-w-[400px] ' onMouseEnter={() => setIsDisplayDots(true)} onMouseLeave={() => setIsDisplayDots(false)}>
       <div className='w-[100%] xs:h-[190px] sm:h-[177px] md:h-[170px]'>
        <Link href={`/watch/${video?.id}`}>
           <img  src={`${IPFS_GATEWAY}${video?.image}` || `${IPFS_GATEWAY_TWO}${video?.image}`}   alt="video cover" className='w-[100%] h-[100%] object-cover rounded-lg '  />
        </Link> 
        </div>

         <div className='flex gap-2 mt-2 justify-between  '>
           <div className='flex gap-2 items-start'>
           <div>
            {avatarUrl  ? (
               <Link href={`/channel/${video?.createdByAccount.id}`}> <img  src={`${IPFS_GATEWAY}${avatarUrl}`}   /></Link>
            ) : (

             <Link href={`/channel/${video?.createdByAccount.id}`}> <Image   src={`data:image/svg+xml;base64,${avatar}`} className="w-7 rounded-full" width={8} height={8} /></Link>

            )}

           </div>

           <div>
           <Link href={`/watch/${video?.id}`}> <p className='truncate  font-semibold '>{video && shortenTxt(video?.title, 25)}</p></Link>
           <div className='flex gap-3   text-sm'>
           <div className='flex gap-1 text-gray-500'><p className=''>{video?.upvotesCount}</p> <p className='  font-semibold '>like</p></div>
             <p className=' text-gray-500'>{duration.humanize().replace("a ", "")} ago</p>
           </div>
          
           </div>
           </div>
            {isDisplayDots  && (
              <RxDotsVertical  size={20} className="cursor-pointer" />
            )}
         </div>
         


    </div>
    
  )
}
