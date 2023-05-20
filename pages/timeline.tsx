import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

export default function timeline() {
  return (
    <>
    <Head>
        <title>Timeline</title>
    </Head>
    <div className='w-full h-[80vh] flex items-center justify-center'>
         <div className='flex items-center justify-center flex-col'>
            <Image  src={`/img/empty.svg`} width={200} height={200} alt='empty cover'  className='w-[160px]'    />
             <h1 className="text-2xl font-bold">Your Timeline is Empty</h1>
             <p className="text-lg font-semibold">Follow More creatores</p>
         </div>
    </div>
    </>
  )
}
