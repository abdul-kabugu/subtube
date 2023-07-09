// @ts-nocheck

import { useAmplify, useReactions } from '@/Hooks'
import {useState, Fragment} from 'react'
import { AiOutlineDislike, AiOutlineDollar, AiOutlineLike, AiOutlineLine, AiOutlineRetweet, AiOutlineShareAlt } from 'react-icons/ai'
import { RiShareForward2Line, RiShareForwardLine } from 'react-icons/ri'
import { Dialog, Transition } from '@headlessui/react'
import ShareButtons from './ShareButtons'
import TipUser from './TipUser'
import { AmplifyAlt, DislikeAlt, LikeAlt } from '@/Icons'
export default function FullVideoCardFooter({video}) {
    const [isShowShareToSocial, setisShowShareToSocial] = useState(false)
    const [isShowTipModal, setisShowTipModal] = useState(false)
    const [isThisLiked, setisThisLiked] = useState(false)
    const [isThisDesliked, setisThisDesliked] = useState(false)
    const [isAmplified, setisAmplified] = useState(false)
    const {likePost, deslikePost, isDeslikeLoading, isLikeLoading} = useReactions()
    const {amplifyPost, isAmplifying} = useAmplify()

      const handleToggleShareToSocial = () =>  {
         setisShowShareToSocial(!isShowShareToSocial)
      }
    const handleLike = async (videoId) => {
      setisThisLiked(true)
       await  likePost(videoId)
    }
    const handleDeslike = async (videoId) => {
     setisThisDesliked(true)
       await deslikePost(videoId)
    }
    const handleAmplify = async(videoId, video) => {
       setisAmplified(true)
       await amplifyPost(videoId, video)
    }
    

  return (
    <div className='mt-3 lg:px-6 w-full  overflow-x-hidden'>
      <div className='flex xs:gap-2 gap-4'>
        <div className={`${isThisLiked && "text-violet-500"} flex gap-1 py-1 xs:px-1  lg:px-3 rounded-md  cursor-pointer font-semibold text-gray-400 items-center hover:bg-gray-800`} onClick={() => handleLike(video?.postById?.id)}>
        <LikeAlt className='w-5 h-5' />
             <button>Like  {video?.postById?.upvotesCount && video?.postById?.upvotesCount}</button>
        </div>

        <div className={`${isThisDesliked && "text-violet-500"} flex gap-1 py-1 px-3 rounded-md  cursor-pointer font-semibold text-gray-400 items-center hover:bg-gray-800`} onClick={() => handleDeslike(video?.postById?.id)}>
           <DislikeAlt className='w-5 h-5' />
             <button> Dislike {video?.postById?.downvotesCount && video?.postById?.downvotesCount}</button>
        </div>

        <div className='flex gap-1 py-1 px-3 rounded-md  cursor-pointer font-semibold text-gray-400 items-center hover:bg-gray-800 xs:hidden md:flex' onClick={() => handleAmplify(video?.postById?.id, video)}>
            <AmplifyAlt className='w-5 h-5' />
             <button> Amplify</button>
        </div>

        <div className='flex gap-1 py-1 px-3 rounded-md  cursor-pointer font-semibold text-gray-400 items-center hover:bg-gray-800 xs:hidden md:flex' onClick={() => setisShowTipModal(true)}>
        <AiOutlineDollar size={19} />
             <button> Tip</button>
        </div>

        <div className='flex gap-1 py-1 px-3 rounded-md  cursor-pointer font-semibold text-gray-400 items-center hover:bg-gray-800' onClick={() => setisShowShareToSocial(true)}>
           <RiShareForwardLine size={19}  />
             <button> Share</button>
        </div>
      </div>

              {/*SHARE  TO  SOCIAL  MODAL */}

              <Transition appear show={isShowShareToSocial} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setisShowShareToSocial(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black border border-fuchsia-900/30 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 "
                  >
                    Share
                  </Dialog.Title>
                  <Dialog.Description className={`mt-3`}>
                   <ShareButtons  postId = {video?.postById?.id}    />
                   </Dialog.Description>
                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

             {/* END OF SHARE MODAL */}


               
              <Transition appear show={isShowTipModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setisShowTipModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full border border-fuchsia-700/30  max-w-md transform overflow-hidden rounded-2xl bg-black py-2 px-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 "
                  >
                    Support the createor
                  </Dialog.Title>
                  <Dialog.Description className={`mt-3`}>
                  <TipUser   video={video}   />
                   </Dialog.Description>
                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
         
            {/*TIP USER MODAL*/}
                 

    </div>
  )
}
