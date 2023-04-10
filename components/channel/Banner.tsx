// @ts-nocheck

import React from 'react'
import Identicon from 'identicon.js';
import { useTruncateText } from '@/Hooks';

export default function Banner({data, loading, error}) {
    const {shortenTxt} = useTruncateText()
    console.log("the user data", data)
    const avatar = new Identicon(data?.accountById.id || "heyeye its bla bla blah avatar  here ", {
        size: 120, // adjust the size of the avatar as per your requirement
        format: 'svg' // choose the format of the avatar, such as png or svg
      }).toString()

        if(loading) {
          return(
            <h1>Loading</h1>
          )
        }
  return (
    <div className='w-full '>
        <div className='  w-full h-60 bg-[url(/img/header_banner.png)] bg-cover'></div>

         <div className='mt-4 flex justify-between items-start px-4'>

             <div className='flex gap-4  items-center  '>
                 <img    src={`data:image/svg+xml;base64,${avatar}`} className="w-16 h-16 rounded-full"     /> 
                  <div>
                    <h1 className='leading-9 font-semibold text-2xl capitalize'>{data?.accountById?.profileSpace?.name  || data?.accountById?.profileSpace?.username || data?.accountById?.profileSpace?.handle || shortenTxt(data?.accountById?.id, 10) }</h1>
                     <h2 className='text-black/80 font-semibold'> Subscribers {data?.accountById?.followersCount}</h2>
                  </div>

             </div>
             <button className='font-semibold bg-violet-600 text-white py-1.5 rounded-lg px-3'>Subscribe</button>

         </div>
    </div>
  )
}
