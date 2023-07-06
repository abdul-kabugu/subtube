// @ts-nocheck

import { Tab } from '@headlessui/react'
import {useState} from 'react'
import { AiOutlineExclamation, AiOutlineRetweet, AiOutlineUser, AiOutlineVideoCamera } from 'react-icons/ai'
import { HiOutlineVideoCamera } from 'react-icons/hi'
import AboutUser from './AboutUser'
import Amplified from './Amplified'
import Videos from './Videos'
import classNames from 'classnames';
import { useGetUserData } from '@/Hooks'
import { useRouter } from 'next/router'
import VideoCardSkeleton from '../Loder/VideoCardSkeleton'
import { Error } from '../errors'
import { AmplifyAlt } from '@/Icons'

export default function UserVideos() {
  const [currentTab, setcurrentTab] = useState(0)
    const router = useRouter()
    const channelId =  router.query.channelId
    const {userData, isUserDataLoading, isUserDataError} = useGetUserData(channelId)
    console.log("the user data", userData)

  
   if(isUserDataError) {
    return(
      <Error  />
    )
   }
      if(isUserDataLoading){
        return(
          <VideoCardSkeleton   />
        )
      }

       const getCurrentTab = () => {
        if(currentTab === 0){
          return(
            <Videos videos={userData?.accountById?.posts} />
          )
        }else if(currentTab === 1){
          return(
            <Amplified  />
          )
        } else if(currentTab === 2){
          return(
            <AboutUser />
          )
        }
       }
  return (
    <div className='mt-5  w-full '>
        <div>
       <div className='flex gap-5'>
          <div className={`flex gap-2 items-center bg-gray-800 px-3 py-1 rounded-lg hover:bg-gray-700 ${currentTab === 0 && "bg-gray-600"} cursor-pointer`} onClick={() => setcurrentTab(0)}>
            <button>Videos</button>
             <AiOutlineVideoCamera className='w-3.5' />
          </div>
          <div  className={`flex gap-2 items-center bg-gray-800 px-3 py-1 rounded-lg hover:bg-gray-700 ${currentTab === 1 && "bg-gray-600"} cursor-pointer`} onClick={() => setcurrentTab(1)}>
            <button>Amplified</button>
             <AmplifyAlt className='w-3.5 h-3.5 text-white' />
          </div>
          <div  className={`flex gap-2 items-center bg-gray-800 px-3 py-1 rounded-lg hover:bg-gray-700 ${currentTab === 2 && "bg-gray-700"} cursor-pointer`} onClick={() => setcurrentTab(2)}>
            <button>About</button>
             <AiOutlineUser />
          </div>
       </div>
        {getCurrentTab()}
        </div>
    </div>
  )
}
