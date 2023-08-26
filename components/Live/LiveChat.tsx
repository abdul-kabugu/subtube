// @ts-nocheck

import {useState, useEffect} from 'react'
import grill from '@subsocial/grill-widget'
import { SPACE_ID } from '@/assets/constant'
import { Resource } from '@subsocial/resource-discussions'
import { BsChatDots } from 'react-icons/bs'
export default function LiveChat({video}) {
    console.log("from live chat", video)
   const [isShowChat, setisShowChat] = useState(false)
    const hubs_space = "11543"
   

useEffect(() => {
  grill.init({
    widgetElementId: 'grill',
    theme : "dark",
    hub: { id: "1026" },
    channel: {
        type: 'resource',
        resource: new Resource({
          schema: 'social',
          app: 'frentube',
          resourceType: 'profile',
          resourceValue: { id: 'elonmusk' },
        }),
        settings: {
          enableBackButton: false,
          enableLoginButton: false,
          enableInputAutofocus: true,
        },
        metadata: {
          title: 'Live chat',
          body: "frentube live chat",
          image: 'https://i.ibb.co/RvNQWSs/logo.png'
        },

}})



/*grill.init({
  widgetElementId: 'grill',
  theme: 'dark',
  hub: { id: '1026' },
  channel: {
    type: 'resource',
    resource: new Resource({
      schema: 'social',
      app: 'twitter',
      resourceType: 'profile',
      resourceValue: { id: 'elonmusk' },
    }),
    settings: {
      enableBackButton: false,
      enableLoginButton: false,
      enableInputAutofocus: true,
    },
    metadata: {
      title: 'Live chat',
      body: 'Onchain discussion about Elon Musk',
      //image:
       // 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2023-07/230708-elon-musk-mjf-1353-a96cff.jpg',
    },
  },
})*/
}, [])
  
  const  toggleIsShowChat = () => {
    setisShowChat(!isShowChat)
  }
 
  return (
    <div className={` relative xs:absolute xs:h-[75vh] md:min-h-screen xl:h-[90vh] right-3 xl:static  xl:w-[23vw]  z-10 `}>
         <div id="grill" className={`${! isShowChat && "xs:hidden xl:block"} xs:h-[72vh] xl:h-[90vh] `}></div>
            <div className='absolute xs:-bottom-3 md:bottom-16 xs:right-2 bg-gray-800 cursor-pointer  xs:w-12 xs:h-12 w-20 h-20 rounded-full flex items-center justify-center xl:hidden' onClick={toggleIsShowChat}>
              <BsChatDots  className='w-7 h-7 text-gray-400 '  />
            </div>
    </div>
  )
}
