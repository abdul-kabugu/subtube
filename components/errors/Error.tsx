import Link from 'next/link'
import React from 'react'

export default function Error() {
  return (
    <div className='h-screen flex items-center justify-center bg-sky-50 w-[90vw]'>
         <div className='flex flex-col gap-3 items-center justify-center'>
           <img   src='/img/logo.png' className='w-20 h-20 rounded-full object-fill'  />
            <h1 className=' text-3xl font-semibold leading-10'>Something Went wrong</h1>
             <p className='text-xl text-black lowercase'>Please Check Yourconnection And try again</p>
              <Link href={`/`}>
              <button className='bg-violet-700 text-white px-3 py-1 rounded-lg'>Re-load</button>
              </Link>
         </div>
    </div>
  )
}
