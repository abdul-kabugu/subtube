// @ts-nocheck
import {useState, useEffect, Fragment} from 'react'
import {Dialog,  Popover} from '@headlessui/react'
import { useAuthenticate, useTruncateText } from '@/Hooks'
import Image from 'next/image'
import Identicon from 'identicon.js';
import { RiNotification3Line } from 'react-icons/ri';
import {TbVideoPlus} from 'react-icons/tb'
import Link from 'next/link';
import { CiLogout, CiUser } from 'react-icons/ci';
import { profilePop } from '@/assets/constant';
import {toSubsocialAddress} from '@subsocial/utils'
import SettingsModal from '../modal/SettingsModal';
import { Menu, Transition } from "@headlessui/react";
import { useNotificationsModal, useSettingsModal } from '@/store/slices/modalSettingsSlice';
import { AiOutlineSetting } from 'react-icons/ai';
import { BellOutline, ChannelOutline, HandWaveOutline } from '@/Icons';
import Notifications from './Notifications';
export default function ConnectedProfile() {
   const [isAuthenticated, setisAuthenticated] = useState(false)
   const [isShowSignInModal, setisShowSignInModal] = useState(false)
    const [currentUserProfile, setcurrentUserProfile] = useState()
    const [testCond, settestCond] = useState(true)
    const [isShowProfilePop, setisShowProfilePop] = useState(false)
    const {isSettingsModalVisible, toggleSettingsModal } = useSettingsModal()
    const { isNotificationModalVisible,  toggleNotificationsModal} = useNotificationsModal()

   // const [isShowSettingsModal, setisShowSettingsModal] = useState(false)
   const {connectWallet, userWallets, isNoExtension} = useAuthenticate()
const {shortenTxt} = useTruncateText()
   const handleSaveLogins =(userDetails) => {
    localStorage.setItem('poltubeUserDetails', JSON.stringify(userDetails));
     setisShowSignInModal(false)
   // console.log("the current user details", userDetails)
    setisAuthenticated(true)
  }

  // open external links
  function openURLInNewTab(url : any) {
    let newTab = window.open(url, '_blank');
    newTab?.focus();
  }
  // susocial address
  const subsocialAddress = toSubsocialAddress(currentUserProfile?.address)
  const handleLogOut = () => {
    localStorage.removeItem('poltubeUserDetails');
    setisAuthenticated(false)
    setcurrentUserProfile()
    setisShowProfilePop(false)
   }

   const  handleConnectWallet = async () =>  {
    await connectWallet()
     setisShowSignInModal(true)
     
}

  console.log("current  user inf", currentUserProfile)
    useEffect(() => {
      const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
       setcurrentUserProfile(CONNECTED_USER_DETAILS)

    }, [ isAuthenticated])

     
      const ConnectedUser = () =>  {
            const avatar = new Identicon(currentUserProfile?.address || "heyeye its bla bla blah avatar  here ", {
                size: 120, // adjust the size of the avatar as per your requirement
                format: 'svg' // choose the format of the avatar, such as png or svg
              }).toString()
          return(
          <div className='flex items-center gap-3 relative'>
            <div className='w-9 hover:bg-gray-200 rounded-full h-9 flex items-center justify-center cursor-pointer'>
              <BellOutline className='h-5 w-5' onClick={toggleNotificationsModal} />
               
            </div>
  <Link href={`/upload`}>
             <div className='xs:hidden md:flex items-center gap-2 bg-violet-800 hover:bg-violet-600 text-white leading-6 font-semibold py-1.5 px-3 rounded-lg'>
              <TbVideoPlus className='cursor-pointer' size={18} />
               <button>New video</button>
             </div>
             </Link>
              <Menu as="div" className="relative ">
              <Menu.Button>
         <Image src={`data:image/svg+xml;base64,${avatar}`}  width={10} height={10} className="w-9 h-9 cursor-pointer rounded-full" alt='profile pic' />
          </Menu.Button>
          <Transition
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="div"
                className="absolute right-0 bg-white  shadow-lg  border border-indigo-200  rounded-lg w-[220px] px-4 py-3"
              >
                
                <Menu.Item>
                  <Link href={`/channel/${subsocialAddress}`}>
                  <div
                    className="flex items-center gap-2 cursor-pointer  py-2 hover:bg-indigo-100  px-2 rounded-lg my-3"
                   >
                    <ChannelOutline className="w-5 h-5" />
                    <button className=" text-sm capitalize ">
                     Your Channel
                    </button>
                  </div>
                  </Link>
                </Menu.Item>
              
                 <Menu.Item>
                  <div
                    className="flex items-center gap-2 cursor-pointer  py-2 hover:bg-indigo-100  px-2 rounded-lg my-3"
                    onClick={() => openURLInNewTab(`https://polkaverse.com/accounts/${subsocialAddress}`)}
                  >
                    <AiOutlineSetting className="w-5 h-5" />
                    <button className=" text-sm capitalize ">
                      Channel Settings
                    </button>
                  </div>
                </Menu.Item>

                <Menu.Item>
                  <div
                    className="flex items-center gap-2 cursor-pointer  py-2 hover:bg-indigo-100  px-2 rounded-lg mt-3"
                    onClick={handleLogOut}
                  >
                    <HandWaveOutline className="w-5 h-5" />
                    <button className=" text-sm capitalize ">
                      Sign out
                    </button>
                  </div>
                </Menu.Item>
              </Menu.Items>
              </Transition>
               </Menu>
            
                
          </div>
        )
}
  return (
    <div>
      {currentUserProfile ?(
        <ConnectedUser  />
      ): 
         <button className='bg-violet-800 xs:py-0.5 md:py-1.5 xs:px-2 md:px-4 rounded-xl text-white md:font-semibold capitalize' onClick={handleConnectWallet}>connect wallet</button>

         
        

      }
          <Transition appear show={isShowSignInModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setisShowSignInModal(false)}>
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
                    className="text-lg font-medium leading-6 text-gray-900 "
                  >
                    Sign-In
                  </Dialog.Title>
                  <div className="mt-2">
                    <h1 className='leading-4 text-gray-700 mb-5'>Click on your account to Sign In</h1>
                       
                      { userWallets ?  userWallets?.map((wallet, i) => {
                        //https://nftcoders.com/avatar/avatar-cool.svg
                         const avatar = new Identicon(wallet.address, {
                          size: 420, // adjust the size of the avatar as per your requirement
                          format: 'svg' // choose the format of the avatar, such as png or svg
                        }).toString()
                        return(
                          <div key={i} className="flex items-center justify-between mb-5 cursor-pointer hover:bg-gray-200 py-2 px-3 rounded-lg " onClick={() => handleSaveLogins(wallet)}>
                            <div className='flex items-center gap-3'>
                              <Image   src={`data:image/svg+xml;base64,${avatar}`} className="w-8 rounded-full" width={10} height={10} />
                               <p className='leading-7'>{wallet?.meta?.name}</p>
                                
                            </div>
                            <p className='leading-5'>{wallet.address && shortenTxt( wallet?.address, 12)}</p>
                          </div>
                        )
                      })  : (
                         <div>
                          <h1>No wallet please install wallet</h1>
                         </div>
                      )}
                  </div>

               
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

       {isSettingsModalVisible  && <SettingsModal  />}
        {isNotificationModalVisible && <Notifications />}
         
    </div>
  )
}
