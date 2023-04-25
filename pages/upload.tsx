// @ts-nocheck

import { SelectFile, UploadForm } from '@/components/upload'
import Head from 'next/head'
import {useState, useEffect} from 'react'

export default function Upload() {
    const [selectedVideo, setselectedVideo] = useState()
    const [selectedTumbnail, setselectedTumbnail] = useState()
    const [videoTitle, setvideoTitle] = useState("")
    const [videoCaption, setvideoCaption] = useState("")
    const [videoTags, setvideoTags] = useState([])
    const [tag, settag] = useState("")
    const [file, setfile] = useState()
    const [isConnected, setisConnected] = useState(false)

     useEffect(() => {
      const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
      console.log("the connected from upload", CONNECTED_USER_DETAILS)
         if(CONNECTED_USER_DETAILS?.address){
          setisConnected(true)
         }
     }, [])
     

   console.log("the  selcted  file  ts  file", selectedVideo)
  return (
   <>
     <Head>
     <title>Upload </title>
     </Head>

      <div className='h-screen w-screen bg-sky-50 px-2'>
        {file? (
          <UploadForm file = {file} setfile = {setfile} selectedThumbnail = {selectedTumbnail} setSelectedThumbnail = {setselectedTumbnail}
            videoTitle = {videoTitle} setVideoTitle = {setvideoTitle} videoCaption = {videoCaption} setVideoCaption = {setvideoCaption}
            videoTags = {videoTags} setVideoTags = {setvideoTags}
          />
        ) : (
             <SelectFile  file ={file} setfile = {setfile}  />
        )}
      </div>
   </>
  )
}
