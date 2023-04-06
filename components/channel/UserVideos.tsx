// @ts-nocheck

import { Tab } from '@headlessui/react'
import React from 'react'
import { AiOutlineExclamation, AiOutlineRetweet } from 'react-icons/ai'
import { HiOutlineVideoCamera } from 'react-icons/hi'
import AboutUser from './AboutUser'
import Amplified from './Amplified'
import Videos from './Videos'
import classNames from 'classnames';
import { useGetUserData } from '@/Hooks'
import { useRouter } from 'next/router'

export default function UserVideos() {
    const router = useRouter()
    const channelId =  router.query.channelId
    const {userData, isUserDataLoading, isUserDataError} = useGetUserData(channelId)
    console.log("the user data", userData)
  return (
    <div className='mt-5 px-6 '>
        <div>
            <Tab.Group>
                <Tab.List className={`flex space-x-1 gap-6 `}> 
                     <Tab   className={({ selected }) =>
                classNames(
                  ' rounded-lg py-1 px-1 leading-5 text-blue-800',
                  'ring-white ring-opacity-60 ring-offset-2 ring-violet-600/80 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>
                     <div className='flex items-center gap-1' >
                    <HiOutlineVideoCamera size={16}  />
                     <p>Videos</p>
                    </div>
                     </Tab>

                     <Tab className={({ selected }) =>
                classNames(
                  ' rounded-lg py-1 px-1 leading-5 text-blue-800',
                  'ring-white ring-opacity-60 ring-offset-2 ring-violet-600/80 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>
                     <div className='flex items-center gap-1'>
                     <AiOutlineRetweet  />
                     <p>Amplified</p>
                    </div>
                     </Tab>

                     <Tab className={({ selected }) =>
                classNames(
                  ' rounded-lg py-1 px-1 leading-5 text-blue-800',
                  'ring-white ring-opacity-60 ring-offset-2 ring-violet-600/80 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>
                     <div className='flex items-center gap-1'>
                       <AiOutlineExclamation  />
                     <p>About</p>
                    </div>
                     </Tab>
                </Tab.List>
                
                <Tab.List>
                    <Tab.Panel>
                         <Videos  videos = {userData?.accountById?.posts}  />
                    </Tab.Panel>
                     <Tab.Panel>
                     <Amplified channelId ={channelId}  />

                     </Tab.Panel>

                     <Tab.Panel>
                         <AboutUser  />
                     </Tab.Panel>
                </Tab.List>
                
            </Tab.Group>
        </div>
    </div>
  )
}
