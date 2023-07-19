// @ts-nocheck

import { Banner, UserVideos } from '@/components/channel'
import { client } from '@/graphql/apolloClient'
import { GET_USER_PROFILE } from '@/graphql/fragments/getUserProfile'
import Head from 'next/head'
import React from 'react'

export default function channelId({data, userId, loading, error}) {
  
  return (
    <>
     <Head>
      <title>
      {data?.accountById?.profileSpace?.name  || data?.accountById?.profileSpace?.handle || data?.accountById?.profileSpace?.username || "FrenTube" }
     </title>
            <meta name='description' content={data?.accountById?.profileSpace?.summary} />

              {/* Twitter */}
<meta name="twitter:card" content={`FrenTube`} key="twcard" />
<meta name="twitter:creator" content={data?.accountById?.profileSpace?.name  || data?.accountById?.profileSpace?.handle || data?.accountById?.profileSpace?.username || "FrenTube" } key="twhandle" />

{/* Open Graph */}
<meta property="og:url" content={`/channels/${channelId}`} key="ogurl" />
<meta property="og:image" content={`/img/banner.png`} key="ogimage" />
<meta property="og:site_name" content={`Poltube -  Decentralized video shring platform`} key="ogsitename" />
<meta property="og:title" content= {data?.accountById?.profileSpace?.name  || data?.accountById?.profileSpace?.handle || data?.accountById?.profileSpace?.username || "FrenTube" } key="ogtitle" />
<meta property="og:description" content={"Poltube -  Decentralized video  sharing platform"} key="ogdesc" />
     </Head>
    <div className=' max-w-full md:min-w-[95vw] min-h-screen bg-black text-gray-300 '>
       <Banner data = {data} loading = {loading}  error = {error} />  
       <UserVideos channelId = {channelId} /> 
    </div>
    </>
  )
}


export  async function getServerSideProps (context)  {
  const {channelId} = context.params
   const {data, loading, error} = await client.query({
   query : GET_USER_PROFILE,
   variables : {
    "accountByIdId" : channelId
   }
   })

   return{
     props : {
       data : data,
       userId : channelId, 
       loading : loading,
      
     }
   }
 }


