// @ts-nocheck

import {useState, useEffect} from 'react'
import grill from '@subsocial/grill-widget'
import { SPACE_ID } from '@/assets/constant'
import { Resource } from '@subsocial/resource-discussions'
export default function LiveChat({video}) {
    console.log("from live chat", video)
   
    const hubs_space = "11543"
   const showGrill =() =>  grill.init({
        widgetElementId: 'grill',
        theme : "dark",
        hub: { id: "1002" },
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
              title: 'Elon Musk',
              body: 'Onchain discussion about Elon Musk',
              
            },

}})

useEffect(() => {
  grill.init({
    widgetElementId: 'grill',
    theme : "dark",
    hub: { id: "1002" },
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
          title: 'Elon Musk',
          body: 'Onchain discussion about Elon Musk',
          
        },

}})
}, [])
  

 
  return (
    <div className=' xs:hidden xl:block xl:w-[23vw] border rounded-lg border-fuchsia-900/40'>
        <div id="grill" className='h-[90vh] '></div>

    </div>
  )
}
