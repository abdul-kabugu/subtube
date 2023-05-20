// @ts-nocheck
import {useState, Fragment, useRef, useEffect, useContext} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import { useSettingsModal } from '@/store/slices/modalSettingsSlice'
import { interests } from '@/assets/constant'
import { AiOutlineCamera } from 'react-icons/ai'
import { useCreateProfile, useGetUserData, usePinToIpfs } from '@/Hooks'
import { toSubsocialAddress } from '@subsocial/utils'
import { SubsocialContext } from '@/subsocial/provider'
import { useUpdateProfile } from '@/Hooks'
export default function SettingsModal() {
  const [currentStep, setcurrentStep] = useState(0)
  const [selectedInterests, setSelectedInterests] = useState([]);
const [profileName, setprofileName] = useState("")
const [profileAvatar, setprofileAvatar] = useState()
const [profileBio, setprofileBio] = useState("")
const [currentUerProfile, setcurrentUerProfile] = useState()
const {uploadToIpfs} = usePinToIpfs()
  const handleInterestClick = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  useEffect(() => {
    const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
     setcurrentUerProfile(CONNECTED_USER_DETAILS)

  }, [])
  const {api, isReady} = useContext(SubsocialContext)
  const {createProfile, isCreatingProfile} = useCreateProfile()
  const {updateProfile, isUpdatingProfile} = useUpdateProfile()
   const accountAddressId = toSubsocialAddress(currentUerProfile?.address)
  const {userData, isUserDataLoading, isUserDataError} = useGetUserData(accountAddressId)
   console.log("the user data from settings", userData)
 const handleNext = () => {
  if(currentStep < 2){
    setcurrentStep(currentStep + 1)
  }
 }

 const handleBack = () => {
  if(currentStep > 0){
    setcurrentStep(currentStep -1)
  }
 } 
 const handleCreateProfile = async (about, name) =>  {
  if(profileAvatar && !userData?.accountById?.profileSpace){
    const avatarFileCID = await uploadToIpfs(profileAvatar)
    console.log("the log transactuions", avatarFileCID)
  await createProfile(about, avatarFileCID?.path, name)

  }else if(userData?.accountById?.profileSpace){
    const avatarFileCID = await uploadToIpfs(profileAvatar)
    console.log("the log transactuions", avatarFileCID)
    await updateProfile(about, avatarFileCID?.path, name, userData?.accountById?.profileSpace.id )
  }
}
  const imgRef = useRef(null)
  const handleSelectFile = () => {
    imgRef.current.click()
  }

   const getAvatarState = () => {
    if(!userData?.accountById?.profileSpace && !profileAvatar){
      return(
        <div className={`w-[120px] h-[120px] rounded-full ring-1 flex items-center justify-center`}>
        <AiOutlineCamera className='w-6 h-6 cursor-pointer' onClick={handleSelectFile} />
        <input  type='file' onChange={e => setprofileAvatar(e.target.files[0])} ref={imgRef} accept='image/*' hidden  />
      </div>
      )
    }else if(userData?.accountById.profileSpace !== null && ! profileAvatar){
      return(
        <div className={`w-[120px] h-[120px] rounded-full ring-1 flex items-center justify-center`}>
        <AiOutlineCamera className='w-6 h-6 cursor-pointer' onClick={handleSelectFile} />
        
        <input  type='file' onChange={e => setprofileAvatar(e.target.files[0])} ref={imgRef} accept='image/*' hidden  />
      </div>
      )
    }else if(profileAvatar){
      return(
        <div className={`w-[120px] h-[120px] rounded-full ring-1 flex items-center justify-center relative`}>
          <img src={URL.createObjectURL(profileAvatar)} alt='selected image' className='w-[80%] h-[80%] object-cover rounded-full opacity-70'   />
        <AiOutlineCamera className='w-6 h-6 cursor-pointer absolute top-12' onClick={handleSelectFile} />
    <input  type='file' onChange={e => setprofileAvatar(e.target.files[0])} ref={imgRef} accept='image/*' hidden  />
      </div> 
      )
    }
   }
  const getCurrentStep = () => {
  if(currentStep  === 0) {
    return(
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">

      <Dialog.Title
      as="h3"
      className="text-lg font-medium leading-6 text-gray-900 mb-5"
    >
      🏄‍♂️ What do you want to see on Frentube?
    </Dialog.Title>
    <div className="mt-2">
      <div className='flex gap-4 flex-wrap  '>
      {interests.map((item, i) =>  {

        return(
          <div key={i} className={`flex gap-2 ring-1 ring-gray-300 px-3 
          py-1.5 rounded-lg cursor-pointer ${selectedInterests.includes(item) && "bg-violet-700 text-white"}`} 
          onClick={() =>handleInterestClick(item)}>
             <p>{item.symbol}</p>
              <p>{item.title}</p>
           </div>
        )
      })}
    </div>
    </div>

    <div className='flex justify-between my-3'>
                <button onClick={handleBack} className='bg-violet-600 py-1 text-white px-4 rounded-lg'>Back</button>
                <button onClick={handleNext}  className='bg-violet-600 py-1 text-white px-4 rounded-lg'>Next</button>
               </div>
    </Dialog.Panel>
    )
  } else if(currentStep  === 1) {
    return(
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">

      <Dialog.Title
      as="h3"
      className="text-lg font-medium leading-6 text-gray-900 mb-5"
    >
      💫 Update your channel
    </Dialog.Title>
    <div className="mt-2">
     <div className='w-[400px] flex flex-col gap-4 items-center justify-center'> 
         {getAvatarState()}
       <div className='w-full flex flex-col gap-1'>
        <h3 className='font-bold'>channel name</h3>
        <input  type='text' value={profileName} onChange={e => setprofileName(e.target.value)} placeholder='channel name'  
         className='w-full border focus:outline-none hover:border-violet-500 py-1.5 px-4 rounded-lg'
        />
       </div>

       <div className='w-full flex flex-col gap-1'>
        <h3 className='font-bold'>channel Bio</h3>
        <textarea  type='text' value={profileBio} onChange={e => setprofileBio(e.target.value)} placeholder='channel bio' 
         className='h-14 w-full focus:outline-none border border-gray-300 hover:border-violet-500 rounded-lg py-1.5 px-4'
        />
       </div>
     </div>
    </div>

    <div className='flex justify-between my-3'>
                <button onClick={handleBack} className='bg-violet-600 py-1 text-white px-4 rounded-lg'>back</button>
                <button onClick={handleNext} className='bg-violet-600 py-1 text-white px-4 rounded-lg'>next</button>
               </div>
    </Dialog.Panel>
    )
  } else if(currentStep === 2){
    return(
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">

      <Dialog.Title
      as="h3"
      className="text-lg font-medium leading-6 text-gray-900 mb-4"
    >
      ⚡ Energy
    </Dialog.Title>
    <div className="mt-2 w-fit">
      <p className="text-sm text-gray-500">
      Energy allows you to use PolkaVerse. You can create energy here by burning SUB or get a small
       amount of energy for free (only for new users), allowing you to start posting without getting tokens.
      </p>
      <div >
      <h1 className='text-lg my-2'>1.Copy the text below.</h1>
        <div className='border border-gray-300 rounded-lg py-2 px-4 text-sm font-mono'>
        !energy {toSubsocialAddress( currentUerProfile?.address)}
        </div>
        <h1 className=' text-lg my-2'>2. Paste the text into the energy-bot</h1>
      </div>
    </div>



    <div  className='flex justify-between my-3'>
                <button onClick={handleBack} className='bg-violet-600 py-1 text-white px-4 rounded-lg'>back</button>
                <button onClick={() => handleCreateProfile(profileBio, profileName)} className='bg-violet-600 py-1 text-white px-4 rounded-lg'>Submit</button>
               </div>
    </Dialog.Panel>
    )
  }
  }
  const {isSettingsModalVisible, toggleSettingsModal } = useSettingsModal()
  return (
    <>
    <Transition appear show={isSettingsModalVisible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleSettingsModal}>
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
                
              {getCurrentStep()}
               
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </>
  )
}
