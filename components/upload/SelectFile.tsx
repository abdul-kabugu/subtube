// @ts-nocheck

import {useState, useRef} from 'react'
import { AiOutlineUpload } from 'react-icons/ai'

export default function SelectFile({file, setfile}) {
  
    const videoRef = useRef(null)
    console.log("The  selected file", file)
   const  handleOpenImgSelector = () =>  {
    videoRef.current.click()
   }
  return (
    <div className=' xs:h-[90vh] md:h-[90vh] flex items-center justify-center'>
    <div className='xs:w-full md:w-4/6 border-2 border-dotted border-gray-400 rounded-lg p-4 h-[70vh] flex flex-col items-center justify-center' onClick={handleOpenImgSelector}>
      <AiOutlineUpload  className='text-gray-400  ' size={150}  /> 
       <input  type="file"  onChange={e => setfile(e.target.files[0])} accept="video/*" ref={videoRef} hidden  /> 
       <div>
        <h1 className='text-4xl font-bold text-gray-400'>Drag and drop</h1>
        <h1   className='text-4xl font-bold text-gray-400'>video to upload</h1>
       </div>
       <button className='mt-6 bg-violet-800 hover:bg-violet-500 py-2 px-4 font-semibold text-lg text-white rounded-md' >Choose Video</button>  
    </div>
    </div>
  )
}
