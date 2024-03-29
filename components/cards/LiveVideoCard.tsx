// @ts-nocheck

import { IPFS_GATEWAY, IPFS_GATEWAY_TWO } from '@/assets/constant';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import {useState, useEffect} from 'react'
import Identicon from 'identicon.js';
import { useTruncateText } from '@/Hooks';
import {RxDotsVertical} from 'react-icons/rx'
import { Tooltip } from 'react-tippy';
export default function LiveVideoCard({video}) {
  const [isDisplayDots, setIsDisplayDots] = useState(false)
  const [timeLeft, setTimeLeft] = useState('');
const {shortenTxt} = useTruncateText()
const toggleIsDisplayDots = () => {
  isDisplayDots ?  setIsDisplayDots(false) : setIsDisplayDots(true)
} 
  console.log("the video from its file", video)
const avatarUrl = video?.createdByAccount?.profileSpace?.image
const avatar = new Identicon(video?.createdByAccount?.id || "hellow  world  this  is auto generated avatr", {
  size: 420, // adjust the size of the avatar as per your requirement
  format: 'svg' // choose the format of the avatar, such as png or svg
}).toString()
 
  const STARTING_TIME = video?.experimental?.startingAt
  const ENDING_TIME = video?.experimental?.endingAt

useEffect(() => {
  const startDateTime = new Date(STARTING_TIME).getTime();
  const endDateTime = new Date(ENDING_TIME).getTime();

  const timer = setInterval(() => {
    const currentTime = new Date().getTime();
    const remainingTime = startDateTime - currentTime;

    if (remainingTime <= 0) {
      clearInterval(timer);
      setTimeLeft('🔴 Live');
      return;
    }

    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    setTimeLeft(`Starts in ${hours}h ${minutes}m ${seconds}s`);
  }, 1000);

  return () => clearInterval(timer);
}, [video]);

const isStreamOver = new Date().getTime() > ENDING_TIME;
console.log( "stream status", timeLeft)

console.log("is stream over", isStreamOver)
  return (

    <div className='flex flex-col w-full border-t-0 sm:max-w-sm rounded-xl h-60 border border-fuchsia-900/50 relative my-2 p-1 font-mono' onMouseEnter={() => setIsDisplayDots(true)} onMouseLeave={() => setIsDisplayDots(false)}>
       <div className='rounded-t-xl h-[80%] object-cover'>
        <Link href={`/live/${video?.id}`}>
           <Image  src={`${IPFS_GATEWAY}${video?.image}` || `${IPFS_GATEWAY_TWO}${video?.image}`}   alt="video cover" className='w-full h-[100%] object-cover rounded-lg border border-fuchsia-900/10 ' width={1200} height={600} />
        </Link> 
        </div>

         <div className='flex gap-2 mt-2 justify-between  '>
           <div className='flex gap-2 items-start'>
           <div>
            {avatarUrl  ? (
               <Link href={`/channel/${video?.createdByAccount.id}`}> <img  src={`${IPFS_GATEWAY}${avatarUrl}`} alt='avatar' className='xs:w-8 xs:h-8 rounded-full'  /></Link>
            ) : (

             <Link href={`/channel/${video?.createdByAccount.id}`}> <Image   src={`data:image/svg+xml;base64,${avatar}`} className="w-8 h-8 rounded-full" width={8} height={8} alt='avatar' /></Link>

            )}

           </div>

           <div>
           <Link href={`/watch/${video?.id}`}> <p className='truncate  font-semibold text-gray-400 '>{video && shortenTxt(video?.title, 28)}</p></Link>
           
            <div>
               <p>{timeLeft}</p>
            </div>
           </div>
           </div>
            {/*isDisplayDots  && (
              <RxDotsVertical  size={20} className="cursor-pointer" />
            )*/}
         </div>
         

     {video?.kind === "SharedPost" && (
     
       <div className='absolute top-4 left-1 bg-white w-7 h-7 rounded-full flex items-center justify-center text-fuchsia-500 animate-pulse'>
          <Tooltip 
       title={`Amplified video`}
       position="right"
       trigger="mouseenter"
       className='text-gray-400'
       >
         <p>🔥</p> 
         </Tooltip>
         </div>
         
     )}
    </div>
    
  )
}
