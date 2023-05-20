import { mobileNavigations } from '@/assets/constant'
import Link from 'next/link'
import React from 'react'

export default function MobileNav() {
  return (
    <div  className='fixed bottom-0 mt border-t-2 border-gray-200 rounded-t-md  bg-white w-full h-12 py-3 px-5 xs:flex md:hidden justify-between items-center z-10'>
    
        {mobileNavigations.map((item, i) => {

            return(
                <Link href={item.to} key={i}>
                <div className='flex flex-col items-center justify-center'>
                    <item.icon className='xs:w-5 xs:h-5 sm:w-7 sm:h-7' />
                    {/*<h3 className='leading-4 text-xs'>{item.title}</h3>*/}
                </div>
                </Link>
            )
        })}
    
    </div>
  )
}
