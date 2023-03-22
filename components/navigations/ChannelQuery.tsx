// @ts-nocheck
import Link from 'next/link'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { CiUser } from 'react-icons/ci'
import {HiOutlineDatabase} from 'react-icons/hi'
export default function ChannelQuery({data, loading, error}) {
  if(data?.posts?.length === 0) {
    return(
       <div className='flex items-center flex-col'>
        <h1 className='text-gray-600 text-sm'>No Data</h1>
         <HiOutlineDatabase className='w-[13px text-gray-400]' />
       </div>
    )
  }

   
  return (
    <div>
        {
          data?.accounts?.map((account, i ) =>  {

            return(
              <Link href={`/channels/${account.id}`} key={i}>
              <div className='flex items-center justify-between mb-2'>
                 <h2 className='font-semibold capitalize text-black/70'>{account?.profileSpace?.name}</h2>
                 <div className='flex items-center'>
                  <CiUser className='text-gray-600' size={14}  />
                  <p className='text-[12px] text-gray-600'>{account?.profileSpace?.followersCount}</p>
                  </div>
              </div>
              </Link>
            )
          })
        }
    </div>
  )
}
