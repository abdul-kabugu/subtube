import Image from 'next/image'
import React from 'react'

export default function SetuInstructions() {
  return (
    <div className=' xs:w-full xs:px-3 lg:px-0 lg:w-3/5'>
        <h1 className='text-3xl font-thin'>Steps to set up a Live Stream</h1>
        <div className='mt-3'>
            <p className='font-thin'>1.  Click the Set Up A New Live Stream button above.</p>
            <p className='font-thin'>2.  Upload a placeholder image which will be used as stream placeholder.</p>
            <p className='font-thin'>3.  Add stream Title .</p>
            <p className='font-thin'>4.  Add starting Time and ending time .</p>
            <p className='font-thin'>5.Once the placeholder is uploaded, we will provide you with a streamer configuration that consists of a Server URL (RTMP) and a Stream Key.  </p>
             <p className='font-semibold my-3'>Enter the configuration in your streaming software eg ORBIS.</p>
              <Image  src={`/img/live-example-3.jpg`} width={1200} height={600} alt='example'    />
        </div>
        </div>
  )
}
