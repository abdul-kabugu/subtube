// @ts-nocheck

import {useState, Fragment, useRef, useEffect, useContext} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import { useEnergyModal } from '@/store/slices/modalSettingsSlice'
import { SubsocialContext } from '@/subsocial/provider'
import { convertToBalanceWithDecimal, toSubsocialAddress } from '@subsocial/utils'
import { Disclosure } from '@headlessui/react'
import { BsChevronDown } from 'react-icons/bs'
import { useTruncateText } from '@/Hooks'

export default function EnergyModal() {
    const {api, isReady} = useContext(SubsocialContext)
    const [currentUerProfile, setcurrentUerProfile] = useState()
    const [energyBalance, setenergyBalance] = useState()
     const {isEnergyModalVisible,   toggleIsEnergyModalVisible} = useEnergyModal()
    useEffect(() => {
        const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
         setcurrentUerProfile(CONNECTED_USER_DETAILS)
         
      }, [api])
  const {shortenTxt} = useTruncateText()
        // open external links
  function openURLInNewTab(url : any) {
    let newTab = window.open(url, '_blank');
    newTab?.focus();
  }

    console.log("energy balance", energyBalance)
  return (
    <Transition appear show={isEnergyModalVisible} as={Fragment}>
    <Dialog as="div" className="relative z-10 " onClose={toggleIsEnergyModalVisible}>
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
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">

<Dialog.Title
as="h3"
className="text-lg font-medium leading-6 text-gray-900 mb-4"
>
⚡ Energy
</Dialog.Title>
<div className="mt-2 min-w-[450px] px-2">
   
<Disclosure>
    {({open}) => (
        <>
        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-violet-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>What is energy?</span>
             <BsChevronDown className='w-4 h-4 text-black/80' />
        </Disclosure.Button>

        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
        Energy lets you use Subsocial to make posts, follow your friends, like their content, etc. NRG can be created by burning SUB tokens, and enables you to perform 5x more actions than if you used SUB.
              </Disclosure.Panel>
        </>
    )}
</Disclosure>
<div className='my-3'>
<Disclosure>
    {({open}) => (
        <>
        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-violet-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>How to get free energy?</span>
             <BsChevronDown className='w-4 h-4 text-black/80' />
        </Disclosure.Button>

        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
               <div className='flex gap-2 my-1'>
              <p className='font-mono'>1. Join subsocial discord server </p>   <button onClick={() => openURLInNewTab('https://discord.com/invite/yU8tgHN')} className='py-1.5 px-4 rounded-lg bg-violet-800 text-white'>Join discord</button>
               </div>
               <div className='flex gap-2 my-1'>
              <p className='font-mono'>2. Copy Your subsocial address:</p> <p className='text-xs font-mono '>{currentUerProfile?.address && shortenTxt(toSubsocialAddress( currentUerProfile?.address), 15)}</p>
               </div>
               <div className='flex gap-1 my-1'>
              <p className='font-mono'>2. Paste Your address in to energy bot start with: !energy</p> 
               </div>
              </Disclosure.Panel>
        </>
    )}
</Disclosure>

<div className='my-3'>
<Disclosure>
    {({open}) => (
        <>
        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-violet-200 focus:outline-none focus-visible:ring focus-visible:ring-violet-400 focus-visible:ring-opacity-75">
            <span>How to Burn SUB for energy?</span>
             <BsChevronDown className='w-4 h-4 text-black/80' />
        </Disclosure.Button>

        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
               <div className='flex gap-2 my-1'>
                <button onClick={() => openURLInNewTab('https://polkaverse.com/energy')} className='py-1.5 px-5 rounded-lg bg-violet-800 text-white font-semibold'>Burn Sub</button>
               </div>
              </Disclosure.Panel>
        </>
    )}
</Disclosure>
</div>
</div>
</div>

</Dialog.Panel>
           
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}
