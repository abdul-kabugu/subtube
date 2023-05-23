// @ts-nocheck
import { useAuthenticate } from '@/Hooks'
import Image from 'next/image'
import React from 'react'
import ConnectedProfile from './ConnectedProfile'
import Search from './search/Search'
import { RoadmapOutline } from '@/Icons'
import { Tooltip } from 'react-tippy'
import {SlEnergy} from 'react-icons/sl'
import { useEnergyModal } from '@/store/slices/modalSettingsSlice'
export default function TopNav() {
  const {isEnergyModalVisible, toggleIsEnergyModalVisible} = useEnergyModal()
  function openURLInNewTab(url : any) {
    let newTab = window.open(url, '_blank');
    newTab?.focus();
  }
  return (
    <div className='flex justify-between h-[60px] items-center bg-white w-full max-w-screen  px-4 py-2 z-10  sticky top-0'>
       <div className='flex gap-1 items-center'>
       <h1 className='font-semibold '>FrenTube</h1>
       <p className='text-xs text-violet-600 uppercase'>Beta</p>
    </div> 
 
    <div>
      <Search   />
    </div>
      <div className="flex gap-2 items-center text-black/80  ">
         <div className='w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 p-1 cursor-pointer' onClick={toggleIsEnergyModalVisible}>
         <SlEnergy className='w-5 h-5' />
         </div>
      <Tooltip 
             title={`Feature requests and roadmap`}
             position="bottom"
             trigger="mouseenter"
             >
        <div className='w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 p-1 cursor-pointer' onClick={() => openURLInNewTab("https://frentube.canny.io/")}>
        <RoadmapOutline className='w-5 h-5  ' />
        </div>
        </Tooltip>
      <ConnectedProfile  />
      </div>
     
    </div>
  )
}
