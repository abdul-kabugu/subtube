// @ts-nocheck

import { useAmplify, useReactions } from '@/Hooks'
import {useState, Fragment} from 'react'
import { AiOutlineDislike, AiOutlineDollar, AiOutlineLike, AiOutlineLine, AiOutlineRetweet, AiOutlineShareAlt } from 'react-icons/ai'
import { RiShareForward2Line, RiShareForwardLine } from 'react-icons/ri'
import { Dialog, Transition } from '@headlessui/react'
import ShareButtons from './ShareButtons'
import TipUser from './TipUser'
export default function FullVideoCardFooter({video}) {
    const [isShowShareToSocial, setisShowShareToSocial] = useState(false)
    const [isShowTipModal, setisShowTipModal] = useState(false)
    const {likePost, deslikePost, isDeslikeLoading, isLikeLoading} = useReactions()
    const {amplifyPost, isAmplifying} = useAmplify()

      const handleToggleShareToSocial = () =>  {
         setisShowShareToSocial(!isShowShareToSocial)
      }

  return (
    <div className='mt-3 lg:px-6'>
      <div className='flex xs:gap-2 gap-4'>
        <div className='flex gap-1 py-1 xs:px-1  lg:px-3 rounded-md  cursor-pointer font-semibold text-black/75 items-center hover:bg-gray-200' onClick={() => likePost(video?.postById?.id)}>
        <AiOutlineLike  size={17} />
             <button>Like  {video?.postById?.upvotesCount && video?.postById?.upvotesCount}</button>
        </div>

        <div className='flex gap-1 py-1 px-3 rounded-md  cursor-pointer font-semibold text-black/75 items-center hover:bg-gray-200' onClick={() => deslikePost(video?.postById?.id)}>
           <AiOutlineDislike size={17}  />
             <button>      Dislike {video?.postById?.downvotesCount && video?.postById?.downvotesCount}</button>
        </div>

        <div className='flex gap-1 py-1 px-3 rounded-md  cursor-pointer font-semibold text-black/75 items-center hover:bg-gray-200' onClick={() => amplifyPost(video?.postById?.id)}>
            <AiOutlineRetweet size={17} />
             <button> Amplify</button>
        </div>

        <div className='flex gap-1 py-1 px-3 rounded-md  cursor-pointer font-semibold text-black/75 items-center hover:bg-gray-200' onClick={() => setisShowTipModal(true)}>
        <AiOutlineDollar size={17} />
             <button> Tip</button>
        </div>

        <div className='flex gap-1 py-1 px-3 rounded-md  cursor-pointer font-semibold text-black/75 items-center hover:bg-gray-200' onClick={() => setisShowShareToSocial(true)}>
           <RiShareForwardLine size={17}  />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Tip User
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
