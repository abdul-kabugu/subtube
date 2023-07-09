// @ts-nocheck

import {useState, useEffect, useRef} from 'react'
import { UploadOutline } from '@/Icons'
import { toSubsocialAddress } from '@subsocial/utils'
import { useGetAccountSpaces } from '@/Hooks'
import { useCreateStream } from '@livepeer/react';
import { usePinToIpfs,useCreateLiveStream  } from '@/Hooks';
export default function StreamSetup() {
    const [streamTitle, setstreamTitle] = useState("")
    const [startingTime, setstartingTime] = useState("")
    const [endingTime, setendingTime] = useState("")
    const [streamPlaceHolder, setstreamPlaceHolder] = useState()
    const [isBeyondTime, setisBeyondTime] = useState(false)
    const [isUploadingPlaceHolder, setisUploadingPlaceHolder] = useState(false)
    const [isShowStreamInfo, setisShowStreamInfo] = useState(false)
    const [isPostingStream, setisPostingStream] = useState(false)
    const [placeHoldeCID, setplaceHoldeCID] = useState()
    const [streamData, setstreamData] = useState()
    const {uploadToIpfs} = usePinToIpfs()

     const {createPost, isCreatingPost, isCreatingPostError, isPostCreated} = useCreateLiveStream()
    /*
    =========================
    GET SPACES OWNED BY USER
    =========================
*/
const [isConnected, setisConnected] = useState(false)
const [userDEtails, setuserDEtails] = useState()
useEffect(() => {
const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
setuserDEtails(CONNECTED_USER_DETAILS)
console.log("the connected from upload", CONNECTED_USER_DETAILS)
   if(CONNECTED_USER_DETAILS?.address){
    setisConnected(true)
   }
}, [])

const subsocialAccount = toSubsocialAddress(userDEtails?.address)
const {data, loading, error} = useGetAccountSpaces(subsocialAccount)
  const [selectetSpace, setselectetSpace] = useState(data)
  const currentSpace = selectetSpace ||  data?.spaces[0].id
  console.log("the spaces data from streaming",currentSpace )

      /*====================
      GET CURRENT TIME
      =======================
      */
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

/*     
====================
GET MAXMUM TIME 
=====================
*/

  const getMaxDateTime = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 3);

    const year = maxDate.getFullYear();
    const month = String(maxDate.getMonth() + 1).padStart(2, '0');
    const day = String(maxDate.getDate()).padStart(2, '0');
    const hours = String(maxDate.getHours()).padStart(2, '0');
    const minutes = String(maxDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  /*
===============================
SELECT A PLACEHOLDER
==========================
  */

     const customPlaceHolder = useRef(null)   
      const SelectPlaceHolder = () => {
        customPlaceHolder.current.click()
      }

       const handleReset = () => {
        setstreamTitle("")
        setstreamPlaceHolder(null)
       }

       /*=====================
       CREATE A STREAM 
        ========================
       */
        const {
          mutate: createStream,
          data: stream,
          status,
          error :streamError,
          isLoading
        } = useCreateStream(
          { name: streamTitle }
        );
        console.log("the placeholder cid", placeHoldeCID)
        console.log("the data of stream", stream)
          // create stream 
           const handleCreateStream = async () => {
              if(streamPlaceHolder && !placeHoldeCID){
                setisUploadingPlaceHolder(true)
                const imgCID = await uploadToIpfs(streamPlaceHolder)
                setplaceHoldeCID(imgCID)
                
                setisUploadingPlaceHolder(false)
                 createStream()
              }else if(streamPlaceHolder && placeHoldeCID){
                setisUploadingPlaceHolder(true)
                const imgCID = await uploadToIpfs(streamPlaceHolder)
                setplaceHoldeCID(imgCID)
                setisUploadingPlaceHolder(false)
                 createStream()
              }
           }
         // post stream 
           const postVideo = async () => {
            if(status === "success" && !isShowStreamInfo ){
              setisPostingStream(true)
              await createPost(streamTitle, placeHoldeCID?.path, stream?.playbackId, currentSpace, startingTime, endingTime)
              setisPostingStream(false)
              setisShowStreamInfo(true)
        }
          }

          useEffect(() => {
            postVideo()
         }, [status])   
  return (
    <div className=' xs:w-full lg:w-3/5 xs:px-3 lg:px-0'>
         <h1 className='text-3xl font-thin text-center'>Set up a Live Stream</h1>
          <div>
            {isShowStreamInfo ? (
              <div className='my-5 flex flex-col justify-center items-center'>
              <h1 className='text-2xl font-semibold text-center'> 🎯 Stream Settings </h1>
                <div className='flex gap-2 my-2'>  
                   <h2 className=' text-gray-300 font-thin'>RTMP ingest URL :</h2> 
                    <h2 className=' text-gray-300 font-mono'>rtmp://rtmp.livepeer.com/live</h2>
                 </div>

                 <div className='flex gap-2'>  
                   <h2 className=' text-gray-300 font-thin'>Stream Key :</h2> 
                    <h2 className=' text-gray-300 font-mono'>{stream?.streamKey}</h2>
                 </div>
              </div>
            ) : (
              <>
              <h1>{currentSpace}</h1>
          <div className='  flex-1 flex flex-col gap-2  mb-3'>
            <h3 className='uppercase text-gray-300 font-serif'>title</h3>
            <input    value={streamTitle} onChange={e => setstreamTitle(e.target.value)}  placeholder="Title that  describes Your stream"  
              className='w-[100%] border bg-inherit border-gray-700 focus:outline-none py-2 px-4 rounded-lg focus:border-violet-700'
            />
          </div>

          <div className=' flex-1   flex flex-col gap-2  mb-3'>
            <h3 className='uppercase text-gray-300 font-serif'>select space</h3>
            <select value={selectetSpace} onChange={e => setselectetSpace(e.target.value)} className='py-2 bg-inherit focus:outline-none border border-gray-700 focus:border-violet-700 rounded-lg px-1'>
            {data?.spaces?.map((space, i) => {
               
              return(
                <option value={space?.id} key={i} className='bg-black text-gray-400'>{space.name}</option>
              )
            })}
        </select>
      

          </div>

          <div className='  flex-1 flex flex-col gap-2  mb-3'>
            <h3 className='uppercase text-gray-300 font-serif'>starting at</h3>
            <input type='datetime-local'  value={startingTime} onChange={e => setstartingTime(e.target.value)}    
              className='w-[100%] border bg-inherit border-gray-700 focus:outline-none py-2 px-4 rounded-lg focus:border-violet-700'
              min={getCurrentDateTime()}
              max={getMaxDateTime()}
            />
              {! startingTime && <h1 className='text-xs text-red-500'>🚨add valid starting time </h1>}
          </div>

          <div className='  flex-1 flex flex-col gap-2  mb-3'>
            <h3 className='uppercase text-gray-300 font-serif'>ending at</h3>
            <input type='datetime-local'  value={endingTime} onChange={e => setendingTime(e.target.value)}    
              className='w-[100%] border bg-inherit border-gray-700 focus:outline-none py-2 px-4 rounded-lg focus:border-violet-700'
              min={getCurrentDateTime()}
              max={getMaxDateTime()}
            />
         {! endingTime && <h1 className='text-xs text-red-500'>🚨add valid ending time </h1>}
          </div>

          <div className='my-5 flex items-end justify-between'>

              <div className='w-[400px] h-[260px] rounded-lg border border-dotted border-gray-600 flex items-center justify-center'>
              {streamPlaceHolder ?  (
                        <img  src={URL.createObjectURL(streamPlaceHolder)} className="w-[100%] h-[100%] object-cover rounded-md"   />
                      ): (
                        <div className='flex gap-3 cursor-pointer flex-col items-center justify-center' onClick={SelectPlaceHolder}>
                        <UploadOutline className='text-gray-500 w-24 '  />
                     <h3 className=' text-gray-500 -m-2'>Upload Placeholder</h3>
                     <input type="file"  onChange={e => setstreamPlaceHolder(e.target.files[0])} accept="image/*" ref={customPlaceHolder} hidden  />
                     </div>
                      )

                      } 
              </div>

               <div className='flex gap-4'>
                <button className='py-1 px-2 rounded-lg border border-fuchsia-800/40' onClick={handleReset}>Reset</button>
                <button className='bg-fuchsia-600 py-1.5 px-3 rounded-lg' onClick={handleCreateStream}> 🔴Go Live</button>
               </div>
          </div>
          </>
            )}
          </div>
    </div>
  )
}
