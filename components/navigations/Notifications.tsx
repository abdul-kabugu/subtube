// @ts-nocheck
import {useState, Fragment} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import { useNotificationsModal, useSettingsModal } from '@/store/slices/modalSettingsSlice'
import Image from 'next/image'

export default function Notifications() {
  const { isNotificationModalVisible,  toggleNotificationsModal} = useNotificationsModal()
  return (
    <>
    <Transition appear show={isNotificationModalVisible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleNotificationsModal}>
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
                    Notifications
                  </Dialog.Title>
                 
                    <div className='mt-4 flex items-center justify-center flex-col'>
                <Image  src={`img/empty.svg`} width={200} height={200} alt='empty' 
                 className='w-[100px] h-[100px] rounded-full'
                />
                <h1 className="text-xl font-bold">0 notifications </h1>
                    </div>
                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </>
  )
}
