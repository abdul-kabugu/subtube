import { useAuthenticate } from '@/Hooks'
import Image from 'next/image'
import React from 'react'
import ConnectedProfile from './ConnectedProfile'
import Search from './Search'

export default function TopNav() {
  
  return (
    <div className='flex justify-between h-[60px] items-center bg-white w-full max-w-screen  px-4 py-2 z-10  sticky top-0'>
       <div>
       <h1 className='font-semibold '>FrenTube</h1>
    </div> 

    <div>
      <Search   />
    </div>

      <ConnectedProfile  />
    </div>
  )
}
