// @ts-nocheck

import { fakeArrayTwo } from '@/assets/constant'
import { GET_POST_BY_ID } from '@/graphql/fragments/getPostById'
import { useGetVideoById, UseSubscribe, useTruncateText } from '@/Hooks'
import { useQuery } from '@apollo/client'
import {useState, useEffect, useContext} from 'react'
import { FullVideoCard } from '../cards'
import VideoCardSkeleton from '../Loder/VideoCardSkeleton'
import VideoFullSkeleton from '../Loder/VideoFullSkeleton'
import RelatedVideos from './RelatedVideos'
import Identicon from 'identicon.js';
import Link from 'next/link'
import FullVideoCardFooter from '../cards/FullVideoCardFooter'
import VideoComments from './VideoComments'
import { Error } from '../errors'
import { SubsocialContext } from '@/subsocial/provider'
import {toSubsocialAddress} from '@subsocial/utils'
import Image from 'next/image'

export default function WatchMain({vidId}) {
  const [isSubscriber, setisSubscriber] = useState(true)
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const {data, loading, error} = useGetVideoById(vidId)
  const [isLodi, setisLodi] = useState(true)
  const {subscribe, isSubscribing, } = UseSubscribe()
  const {api, isReady} = useContext(SubsocialContext)
    console.log("the video data", data)
  const {shortenTxt} = useTruncateText()
    // check if  user have subscribes
    const checkIfIsSubscriber = async (accountA, accountB) =>  {
      if(api){
      const substrateApi = await api.blockchain
     const isFollower = await substrateApi.isAccountFollower(accountA, accountB)
    setisSubscriber(isFollower)
     console.log("is this followers ?", isFollower)
      }
     }
     useEffect(() => {
      const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
       const connectedUser = toSubsocialAddress(CONNECTED_USER_DETAILS?.address)
      checkIfIsSubscriber(connectedUser, data?.postById?.createdByAccount?.id )

    }, [ api, isReady])

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
        <Error   />
      )
     }

     
     
  return (
    <div className='flex  gap-2    md:px-0 '>
      <div className=' w-full'>
      <FullVideoCard video={data}  />
       <div className='mt-2 xs:px-2 md:px-3'>
         <h1 className='leading-10 text-xl capitalize text-black/80 font-semibold'>{data?.postById?.title}</h1>

          <div className='mt-1 flex justify-between  items-center'>
            <div className='flex gap-2 items-center '>
             <Link href={`/channel/${data?.postById?.createdByAccount?.id }`}>
              <Image src={`data:image/svg+xml;base64,${avatar}`} className=" xs:w-[26px] h-[26px] sm:w-[30px] sm:h-[26px] md:w-[40px] md:h-[38px] rounded-full" width={1200} height={600}alt='video cover' />
              </Link>
                <div>
                <Link href={`/channel/${data?.postById?.createdByAccount?.id}`}> <h1 className='xs:text-sm md:text-lg lg:text-xl  text-black/90 font-semibold  '>{ data?.postById?.createdByAccount.profileSpace?.name ||  data?.postById?.createdByAccount && shortenTxt(data?.postById?.createdByAccount?.id, 10)}</h1> </Link>

                  <h3 className='text-black/75 xs:text-xs'>{data?.postById?.createdByAccount?.followersCount} Subscribers</h3>
                </div>
              </div>

               <button className=' md:font-semibold md:text-lg bg-violet-700 text-white xs:px-2 xs:py-1 md:px-3 md:py-1.5 rounded-lg' onClick={() => subscribe()}>{isSubscriber ? "Subscribed" : "Subscribe"}</button>
          </div>

           <FullVideoCardFooter video = {data}   />
            <VideoComments   video = {data}   />
       </div>
      </div>
        <RelatedVideos   />
    </div>
  )
}
