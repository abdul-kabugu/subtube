import { useAuthenticate } from '@/Hooks'
import Link from 'next/link'
import React from 'react'

export default function AuthErrir() {
  const {connectWallet} = useAuthenticate()
  return (
    <div className='h-screen flex items-center justify-center bg-black '>
    <div className='flex flex-col gap-3 items-center justify-center'>
      <img   src='/img/logo.png' className='w-20 h-20 rounded-full object-fill'  />
       <h1 className=' text-3xl font-semibold leading-10'>Auth Required</h1>
        <p className='text-xl  lowercase'>Please Connect your wallet</p>
       
         <button className='bg-fuchsia-600 text-white px-3 py-1 rounded-lg' >Connect Wallet</button>
       
    </div>
</div>
  )
}
