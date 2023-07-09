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

           <Link href={'/live'} className='w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-800 p-1 cursor-pointer'>
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
            d="M5.98959 4.92865C6.28249 5.22155 6.28249 5.69642 5.98959 5.98931C2.67014 9.30877 2.67014 14.6907 5.98959 18.0101C6.28249 18.303 6.28249 18.7779 5.98959 19.0708C5.6967 19.3637 5.22183 19.3637 4.92893 19.0708C1.02369 15.1655 1.02369 8.8339 4.92893 4.92865C5.22183 4.63576 5.6967 4.63576 5.98959 4.92865ZM19.0711 4.92865C22.9763 8.8339 22.9763 15.1655 19.0711 19.0708C18.7782 19.3637 18.3033 19.3637 18.0104 19.0708C17.7175 18.7779 17.7175 18.303 18.0104 18.0101C21.3299 14.6907 21.3299 9.30877 18.0104 5.98931C17.7175 5.69642 17.7175 5.22155 18.0104 4.92865C18.3033 4.63576 18.7782 4.63576 19.0711 4.92865ZM8.81802 7.75708C9.11091 8.04997 9.11091 8.52485 8.81802 8.81774C7.06066 10.5751 7.06066 13.4243 8.81802 15.1817C9.11091 15.4746 9.11091 15.9495 8.81802 16.2424C8.52513 16.5353 8.05025 16.5353 7.75736 16.2424C5.41421 13.8992 5.41421 10.1002 7.75736 7.75708C8.05025 7.46419 8.52513 7.46419 8.81802 7.75708ZM16.2426 7.75708C18.5858 10.1002 18.5858 13.8992 16.2426 16.2424C15.9497 16.5353 15.4749 16.5353 15.182 16.2424C14.8891 15.9495 14.8891 15.4746 15.182 15.1817C16.9393 13.4243 16.9393 10.5751 15.182 8.81774C14.8891 8.52485 14.8891 8.04997 15.182 7.75708C15.4749 7.46419 15.9497 7.46419 16.2426 7.75708ZM12 10.4997C12.8284 10.4997 13.5 11.1713 13.5 11.9997C13.5 12.8281 12.8284 13.4997 12 13.4997C11.1716 13.4997 10.5 12.8281 10.5 11.9997C10.5 11.1713 11.1716 10.4997 12 10.4997Z"
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
