import React from 'react'
import Head from 'next/head'
import { LiveSetup } from '@/components/Live'
export default function goLive() {
  return (
    <>
    <Head>
     <title>Go Live</title>
     </Head>
    <div className='max-h-screen bg-black'>
      <LiveSetup  />
    </div>
    </>
  )
}
