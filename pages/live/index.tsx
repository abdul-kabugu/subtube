import Home from '@/components/Live/Home'
import React from 'react'
import Head from 'next/head'
export default function index() {
  return (
    <>
    <Head>
      <title>Live</title>
    </Head>
    <div className='min-h-screen bg-black/90'>
       <Home  />
    </div>
    </>
  )
}
