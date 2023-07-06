// @ts-nocheck

import {useState, useEffect, useRef, useContext} from 'react'
import { AiOutlineClose, AiOutlinePicture } from 'react-icons/ai'
import {generateVideoThumbnailViaUrl, generateVideoThumbnails, importFileandPreview} from '@rajesh896/video-thumbnails-generator'
import { useCreateProfile, useCreatePost, usePinToIpfs, useGetAccountSpaces } from '@/Hooks'
import { SubsocialContext } from '@/subsocial/provider'
import { IPFS_GATEWAY } from '@/assets/constant'
import ThmbnailsLoader from '../Loder/ThmbnailsLoader'
import { toSubsocialAddress } from '@subsocial/utils'
import {useCreateAsset} from '@livepeer/react'


export default function UploadForm({file,setfile ,  selectedThumbnail, setSelectedThumbnail,videoTitle, setVideoTitle , videoCaption , setVideoCaption ,   videoTags, setVideoTags, userSpaces }) {
  const { isReady, api, network, changeNetwork } = useContext(SubsocialContext)
  
    const [videoThumbnails, setvideoThumbnails] = useState([])
    const [vidUrl, setvidUrl] = useState()
    const [vidThunbnail, setvidThunbnail] = useState()
    const [currentSelectedThmb, setcurrentSelectedThmb] = useState(0)
    const [isThumbnailUploading, setisThumbnailUploading] = useState(false)
    const [videoThumbnailCID, setvideoThumbnailCID] = useState("bafybeieenit4mcrbsshwpksvlutyqqpvj5nrtoe3yfsfet3pytpibn2cna")
    const [isVideoUploading, setisVideoUploading] = useState(false)
    const [videoCID, setvideoCID] = useState("")
    const [coverUrl, setcoverUrl] = useState()
    const [isGenerating, setisGenerating] = useState(true)
    const [selectetSpace, setselectetSpace] = useState(userSpaces?.spaces?.[0]?.id)
    const [isVideoCreated, setisVideoCreated] = useState(false)
    const [isCreatingVideo, setisCreatingVideo] = useState(false)
     const customThumbnailRef = useRef(null)
     const {uploadToIpfs, isUploading, isUploadingError, fileCID} = usePinToIpfs()
     console.log("user details from side", selectetSpace)
  const [tag, settag] = useState("")
  const [converted, setconverted] = useState()
     const addTag = (event) =>  {
        if(event.key === "Enter" && tag.length > 1 && videoTags.length < 5){
          setVideoTags([...videoTags, tag])
          settag("")
        }
     }
    

        //Remove  tag
   const removeTag = (index) => {
    setVideoTags([...videoTags.filter(tags => videoTags.indexOf(tags) !== index)])
   }
   //GENERATE VIDEO  THUMBNAILS
   useEffect(() => {
     if(file) {
      importFileandPreview(file).then((res) => {

        setvidUrl(res)

      })
     generateVideoThumbnails(file, 6).then((res) =>  {
      
       setvideoThumbnails(res)
       setisGenerating(false)
       //setvidThunbnail(videoThumbnails[0])
     }).catch((error) => {
      alert(error)
     })
     }
   }, [file])
    
    
    
       const  resetForm = () =>  {
         setfile("")
          setVideoTitle("")
          setvidThunbnail()
          setvideoThumbnails({})
          setSelectedThumbnail()
          
       }

       const {createPost, isCreatingPost, isCreatingPostError, isPostCreated} = useCreatePost()


  

   const base64ToBlob = (base64String, type) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: type });
  }
      
  
    // upload video thumbnail

     const handleUploadThumbnail =  async () => {
       if(api && vidThunbnail){
        setisThumbnailUploading(true)
        const jpegBlob = base64ToBlob(vidThunbnail?.replace(/^data:image\/(png|jpeg|jpg);base64,/, '') || videoThumbnails[0].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''), 'image/png')
        const imgCID =  await uploadToIpfs(jpegBlob)                    //await api.ipfs.saveFile(jpegBlob)
          setvideoThumbnailCID(imgCID)
          console.log("Image cid", imgCID)
          setisThumbnailUploading(false)
 }
     }

      useEffect(() => {
      handleUploadThumbnail()
      
      }, [vidThunbnail])
/*
      ==================================
      LIVEPEER HOOK TO UPLOAD FILE
    ====================================
    
    */
 const {
   mutate: createAsset,
   data: assets,
   status,
   progress,
   error,
   isLoading,
 } = useCreateAsset(
   file
     ? {
         sources: [
           {
             name: file.name,
             file: file,
             storage: {
               ipfs: true,
               metadata: {
                 name: "interesting video",
                 description: "a great description of the video",
               },
             },
           },
         ] as const,
       }
     : null
 );
 console.log("the progress of video", isLoading);
 console.log("the assets itsell", status);
 /*
    ===========================================
      END OF LIVEPEER HOOK TO UPLOAD FILE
    ===========================================
    
    */
      
  const  handleCreatePost = async () =>  {
      if(!videoThumbnailCID) { 
        setisThumbnailUploading(true)
        const jpegBlob = base64ToBlob(vidThunbnail?.replace(/^data:image\/(png|jpeg|jpg);base64,/, '') || videoThumbnails[0].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''), 'image/png')
        const imgCID =  await uploadToIpfs(jpegBlob)                    //await api.ipfs.saveFile(jpegBlob)
          setvideoThumbnailCID(imgCID)
          console.log("Image cid", imgCID)
          setisThumbnailUploading(false)
 // upload assets
          setisVideoUploading(true)
           await createAsset()
     }else {
  setisVideoUploading(true)
  await createAsset()

 }
  }
       
  const postVideo = async () => {
    if(status === "success" ){
      setisCreatingVideo(true)
      await createPost(videoTitle, videoThumbnailCID?.path,  videoTags, assets[0]?.playbackId, selectetSpace)
      setisCreatingVideo(false)
      setisVideoCreated(true)
}
  }

  useEffect(() => {
     postVideo()
  }, [status])
  
       
   const getCurrentState = () =>  {
    if(isThumbnailUploading) {
      return(
      <button className='py-1.5 px-4 rounded-md bg-violet-700 font-semibold text-white' disabled={true}>Uploading Thumbanail</button>
      )
 
    }else if(isLoading) {
      return(
      <button className='py-1.5 px-4 rounded-md bg-violet-700 font-semibold text-white' disabled={true}>Uploading Video</button>
      )
 
    }else {
      return(
      <button className='py-1.5 px-4 rounded-md bg-violet-700 font-semibold text-white' onClick={() => handleCreatePost()}>Upload video</button>
      )

    }
   }
        
     
      

  return (
    <div className='flex items-center justify-center  min-h-screen'>
      <div className='xs:w-[100%] md:w-[100%] xl:w-5/6 xs:flex-col md:flex-row flex  gap-6'>
        <div className='xs:w-[100%] flex-1 '>
          <div className='  flex-1 flex flex-col gap-2  mb-3'>
            <h3 className='uppercase text-gray-300 font-serif'>title</h3>
            <input    value={videoTitle} onChange={e => setVideoTitle(e.target.value)}  placeholder="Title that  describes Your video"  
              className='w-[100%] border bg-inherit border-gray-700 focus:outline-none py-2 px-4 rounded-lg focus:border-violet-700'
            />
          </div>

          <div className=' flex-1   flex flex-col gap-2  mb-3'>
            <h3 className='uppercase text-gray-300 font-serif'>caption</h3>
            <textarea    value={videoCaption} onChange={e => setVideoCaption(e.target.value)}  placeholder="Add caption to  your  video "   
             className='py-2 px-3 rounded-lg h-36 bg-inherit resize-none focus:outline-none border border-gray-700 focus:border-violet-700'
            
            />
          </div>

          <div className=' flex-1   flex flex-col gap-2  mb-3'>
            <h3 className='uppercase text-gray-300 font-serif'>select space</h3>
            <select value={selectetSpace?.id} onChange={e => setselectetSpace(e.target.value)} className='py-2 bg-inherit focus:outline-none border border-gray-700 focus:border-violet-700 rounded-lg px-1'>
            {userSpaces?.spaces?.map((space, i) => {
               
              return(
                <option value={space?.id} key={i} className='bg-black text-gray-400'>{space.name}</option>
              )
            })}
        </select>
          </div>

          <div  className='flex-1  flex flex-col gap-2 border border-gray-700 rounded-lg mb-3 min-h-32 py-2 px-3'>
            <h3 className='uppercase text-gray-300 font-serif'>Tags</h3>
            <input value={tag} onChange={e => settag(e.target.value)}  placeholder="#subsocial"    
              className='py-1 px-3 rounded-lg border bg-inherit border-gray-800 focus:outline-none focus:border-violet-700'
               onKeyUp={event => addTag(event)}
            />

              <div className='flex gap-2 mt-2 flex-wrap'>
                {videoTags?.map((tag, i) => (
                  <div className='flex bg-violet-700 py-1 px-4 rounded-md items-center text-white gap-2' key={i}>
                    <p>{tag}</p>
                     <AiOutlineClose  size={16} className="cursor-pointer" onClick={() => removeTag(i)} />
                  </div>
                ))}
              </div>
          </div>

        </div>

          <div className=' flex-1 '>
            <div className='bg-black flex items-center justify-center py-1 rounded-lg mb-3'>
              <video width={500} controls className='rounded-md w-[490px] max-h-[330px]' poster={  vidThunbnail}>
            <source src={URL.createObjectURL(file)}/>
            </video>
            </div>

              <div className='mt-3 flex gap-2 flex-wrap items-center justify-center '>
                  <div className='w-[120px] h-[70px] border border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer' onClick={() => { !selectedThumbnail &&  customThumbnailRef.current.click()}}>
                      {selectedThumbnail ?  (
                        <img  src={URL.createObjectURL(selectedThumbnail)} className="w-[100%] h-[100%] object-cover rounded-md"   />
                      ): (
                        <>
                        <AiOutlinePicture className='text-gray-500' size={30} />
                     <h3 className='text-sm text-gray-500 -m-2'>Upload</h3>
                     <input type="file"  onChange={e => setSelectedThumbnail(e.target.files[0])} accept="image/*" ref={customThumbnailRef} hidden  />
                     </>
                      )

                      }
                   
                  </div>
                  
                      {isGenerating  && <ThmbnailsLoader  />}
                   {videoThumbnails?.map((item, i) => {

                    return(
                      <div className={`max-w-[120px] bg-black max-h-[70px] border border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer flex-grow-2 ${currentSelectedThmb === i && "ring-2 ring-violet-700 "}`}key={i} onClick={() =>  {
                          setcurrentSelectedThmb(i)
                          setvidThunbnail(item)
                      }} >
                           <img   src={item} key={i} className="rounded-lg w-[120px] h-[70px] object-contain"    />
                        </div>

                    )
                   })}
              </div>

                <div className='flex items-end justify-end mt-3 gap-4 '>
                    <button className='py-1.5 px-3 rounded-md border hover:bg-gray-600 font-semibold text-gray-300' onClick={resetForm}>Reset</button>

                    {getCurrentState()}
                </div>
          </div>
          
        </div>
    </div>
  )
}
