// @ts-nocheck

import {useState, useEffect} from 'react'
import Identicon from 'identicon.js';
import { useCreateComment, useGetPostComments } from '@/Hooks';
import CommentCard from '../cards/CommentCard';

export default function VideoComments({ video}) {
    const [isShowComment, setisShowComment] = useState(false)
    const [commentTxt, setcommentTxt] = useState("")
    const [currentUserInfo, setcurrentUserInfo] = useState()
 const {commentToPost, isCommenting, } = useCreateComment()
 const {postComments, isPostCommentsLoading, isPostCommentsError} = useGetPostComments(video?.postById?.id)

    useEffect(() => {
        const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
     setcurrentUserInfo(CONNECTED_USER_DETAILS)
    
     
    }, [])
    console.log("the now video", postComments)
    const avatar = new Identicon(currentUserInfo?.address || "bla blah yhis  is  another  random genetrated icon"        , {
        size: 420, // adjust the size of the avatar as per your requirement
        format: 'svg' // choose the format of the avatar, such as png or svg
      }).toString()
  return (
    <div>

          <div className=''>
              <h1 className='text-xl font-semibold my-4'>Comments</h1>
              <div className='flex items-center gap-4'>
    <img src={`data:image/svg+xml;base64,${avatar}`} className="w-[35px] h-[35px] ring-2 ring-violet-400 rounded-full " />
      <div className='w-[100%] py-1 xs:px-1 md:px-3 border border-gray-300 rounded-md flex justify-between'>
        <input   value={commentTxt} onChange={e => setcommentTxt(e.target.value)}  placeholder="I like this video"
          className='w-[85%] focus:outline-none py-1'
        />

         <button className='py-1 xs:px-2 xs:text-sm sm:text-lg md:px-3 rounded-md bg-violet-700 text-white' onClick={() => commentToPost(commentTxt, video?.postById?.id)}>{isCommenting ? "Commenting" : "Comment"}</button>
      </div>
              </div>
          </div>
       <div className='mt-4'>
          {postComments?.posts.map((comment, i) =>  {

            return(
               <CommentCard key={i}  comment = {comment}  />
            )
          })}
       </div>
    </div>
  )
}
