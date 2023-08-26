// @ts-nocheck

import { useGetAccountSpaces } from '@/Hooks'
import AuthErrir from '@/components/errors/AuthError'
import { SelectFile, UploadForm } from '@/components/upload'
import { toSubsocialAddress } from '@subsocial/utils'
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
const [userDEtails, setuserDEtails] = useState()
     useEffect(() => {
      const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
      setuserDEtails(CONNECTED_USER_DETAILS)
      console.log("the connected from upload", CONNECTED_USER_DETAILS)
         if(CONNECTED_USER_DETAILS?.address){
          setisConnected(true)
         }
     }, [userDEtails])
     
     const subsocialAccount = toSubsocialAddress(userDEtails?.address)
     const {data, loading, error} = useGetAccountSpaces(subsocialAccount)
      console.log("the spaces data", data)
   
        if(! userDEtails) {
          return(
            <AuthErrir  />
          )
        }
  return (
   <>
     <Head>
     <title>Upload </title>
     </Head>

      <div className='min-h-screen bg-black '>
        {file? (
          <UploadForm file = {file} setfile = {setfile} selectedThumbnail = {selectedTumbnail} setSelectedThumbnail = {setselectedTumbnail}
            videoTitle = {videoTitle} setVideoTitle = {setvideoTitle} videoCaption = {videoCaption} setVideoCaption = {setvideoCaption}
            videoTags = {videoTags} setVideoTags = {setvideoTags} userSpaces={data}
          />
        ) : (
             <SelectFile  file ={file} setfile = {setfile}  />
        )}
      </div>
   </>
  )
}
