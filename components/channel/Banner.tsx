// @ts-nocheck

import React from 'react'
import Identicon from 'identicon.js';
import { useTruncateText } from '@/Hooks';
import { Error } from '../errors';

export default function Banner({data, loading, error}) {
    const {shortenTxt} = useTruncateText()
    console.log("the user data", data)
    const avatar = new Identicon(data?.accountById?.id || "heyeye its bla bla blah avatar  here ", {
        size: 120, // adjust the size of the avatar as per your requirement
        format: 'svg' // choose the format of the avatar, such as png or svg
      }).toString()

        if(loading) {
          return(
            <h1>Loading</h1>
          )
        }

         if(error) {
          return(
            <Error  />
          )
         }
  return (
    <div className='w-full '>
        <div className='  w-full xs:h-40 md:h-60 bg-[url(/img/header_banner.png)] bg-cover'></div>

         <div className='mt-4 flex justify-between items-start px-4'>

             <div className='flex xs:gap-2 md:gap-4  items-center  '>
                 <img    src={`data:image/svg+xml;base64,${avatar}`} className=" xs:w-10 xs:h-10 md:w-12 md:h-12 xl:w-14 xl:h-14 rounded-full"     /> 
                  <div>
                    <h1 className=' xs:leading-5 xs:text-lg xl:leading-9 font-semibold xl:text-2xl capitalize'>{data?.accountById?.profileSpace?.name  || data?.accountById?.profileSpace?.username || data?.accountById?.profileSpace?.handle || shortenTxt(data?.accountById?.id, 10) }</h1>
                     <h2 className='text-black/80 md:font-semibold'> Subscribers {data?.accountById?.followersCount}</h2>
                  </div>

             </div>
             <button className='md:font-semibold bg-violet-600 text-white xs:py-1 md:py-1.5 rounded-lg xs:px-2 md:px-3'>Subscribe</button>

         </div>
    </div>
  )
}
