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
import Link from 'next/link'
import { ChevronLeftOutline, ChevronRightOutline, FeedOutline } from "@/Icons"
// flex w-full px-4 justify-between items-center gap-1 mt-2
export default function TopNav() {
  const {isEnergyModalVisible, toggleIsEnergyModalVisible} = useEnergyModal()
  function openURLInNewTab(url : any) {
    let newTab = window.open(url, '_blank');
    newTab?.focus();
  }
  return (
    <div className='flex justify-between h-[60px] items-center bg-black w-full  max-w-screen px-3 py-2 z-10  sticky top-0'>
      <div className='flex gap-4 items-center text-gray-500'>
        <Link href={"/"}>
          <img
            src="https://cdn.discordapp.com/attachments/1073616425203273778/1110495007363829810/A_letter_tech_logo.png"
            className="xs:w-8 sm:w-10 rounded-full"
            alt=""
          />
        </Link>
           <Link href={'/timeline'} className='w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-800 p-1 cursor-pointer'>
           <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className=" xs:w-5 xs:h-5 sm:w-6 sm:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
          />
        </svg>{" "}
           </Link>

           <Link href={'/explore'} className='w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-800 p-1 cursor-pointer'>
           <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="xs:w-5 xs:h-5 sm:w-6 sm:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
          />
        </svg>
           </Link>
         </div>
 
    
      <Search   />
 
      <div className="flex gap-2 items-center text-black/80  ">
        
      <Tooltip 
             title={`Feature requests and roadmap`}
             position="bottom"
             trigger="mouseenter"
             >
        <div className='w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-800 p-1 cursor-pointer' onClick={() => openURLInNewTab("https://frentube.canny.io/")}>
        <RoadmapOutline className='xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-400 ' />
        </div>
        </Tooltip>
      <ConnectedProfile  />
      </div>
     
    </div>
  )
}
