import { fakeArrayTwo } from '@/assets/constant'
import React from 'react'

export default function ThmbnailsLoader() {
  return (
    <div className='flex gap-2 flex-wrap'>
        {fakeArrayTwo.map((item, i) =>  {
            return(
                <div className="flex flex-col  animate-pulse  h-full justify-center flex-grow-2 flex-shrink" key={i}>
                                <div className=" w-[120px] h-[70px] border border-gray-700  bg-gray-700  rounded-lg mb-1 ">
                                    </div>

                 </div>
            )
        })}
    </div>
  )
}
