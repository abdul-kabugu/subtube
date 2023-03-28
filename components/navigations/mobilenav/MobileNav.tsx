import { mobileNavigations } from '@/assets/constant'
import Link from 'next/link'
import React from 'react'

export default function MobileNav() {
  return (
    <div  className='bg-white fixed top-[92vh] w-screen h-12 py-3 px-6 xs:flex md:hidden justify-between items-center z-10'>
    
        {mobileNavigations.map((item, i) => {

            return(
                <Link href={item.to} key={i}>
                <div className='flex flex-col items-center justify-center'>
                    <item.icon className='w-19' />
                    <h3 className='leading-4 text-xs'>{item.title}</h3>
                </div>
                </Link>
            )
        })}
    
    </div>
  )
}
