import React from 'react'
import Search from './Search'

export default function TopNav() {
  return (
    <div className='flex justify-between h-[60px] items-center   px-4 py-2'>
       <div>
        <h1 className='font-semibold text-lg'>FrenTube</h1>
    </div> 

    <div>
      <Search   />
    </div>

     <div>
        <button className='bg-violet-800 py-2 px-4 rounded-xl text-white font-semibold capitalize'>connect wallet</button> 
     </div>
    </div>
  )
}
