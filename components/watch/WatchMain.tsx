// @ts-nocheck

import { fakeArrayTwo } from '@/assets/constant'
import { GET_POST_BY_ID } from '@/graphql/fragments/getPostById'
import { useGetVideoById } from '@/Hooks'
import { useQuery } from '@apollo/client'
import {useState} from 'react'
import { FullVideoCard } from '../cards'
import VideoCardSkeleton from '../Loder/VideoCardSkeleton'
import VideoFullSkeleton from '../Loder/VideoFullSkeleton'
import RelatedVideos from './RelatedVideos'
import Identicon from 'identicon.js';
import Link from 'next/link'
import FullVideoCardFooter from '../cards/FullVideoCardFooter'
import VideoComments from './VideoComments'



export default function WatchMain({vidId}) {
  const {data, loading, error} = useGetVideoById(vidId)
  const [isLodi, setisLodi] = useState(true)
    console.log("the video data", data)

    const avatar = new Identicon(data?.postById?.createdByAccount?.id || "blalabalalalala cosome created testxsts", {
      size: 420, // adjust the size of the avatar as per your requirement
      format: 'svg' // choose the format of the avatar, such as png or svg
    }).toString()

    if(loading){
      return(
        <>
        <VideoFullSkeleton  />
       
        </>
      )
     }

     if(error) {
      return(
        <h1>something went wrong</h1>
      )
     }
  return (
    <div className='flex  gap-2  '>
      <div>
      <FullVideoCard video={data}  />
       <div className='mt-2 px-3'>
         <h1 className='leading-10 text-xl capitalize text-black/80 font-semibold'>{data?.postById?.title}</h1>

          <div className='mt-1 flex justify-between  items-center'>
            <div className='flex gap-3'>
             <Link href={`/channel/${data?.postById?.createdByAccount?.id }`}>
              <img    src={`data:image/svg+xml;base64,${avatar}`} className="w-[50px] h-[50px] rounded-full" />
              </Link>
                <div>
                <Link href={`/channels/${data?.postById?.createdByAccount?.id}`}> <h1 className='text-lg text-black/90 font-semibold leading-9 '>{ data?.postById?.createdByAccount.profileSpace?.name ||  data?.postById?.createdByAccount && shortenTxt(data?.postById?.createdByAccount?.id, 10)}</h1> </Link>

                  <h3 className='text-black/75'>{data?.postById?.createdByAccount?.followersCount} Subscribers</h3>
                </div>
              </div>

               <button className='font-semibold text-lg bg-violet-700 text-white px-4 py-1.5 rounded-lg'>Subscribe</button>
          </div>

           <FullVideoCardFooter video = {data}   />
            <VideoComments   video = {data}   />
       </div>
      </div>
        <RelatedVideos   />
    </div>
  )
}
