// @ts-nocheck

import { IPFS_GATEWAY } from '@/assets/constant'
import { LivePage } from '@/components/Live'
import { client } from '@/graphql/apolloClient'
import { GET_POST_BY_ID } from '@/graphql/fragments/getPostById'
import Head from 'next/head'
import React from 'react'

export default function streamId({data, vidId, loading, error}) {
  return (
    <>
      <Head>
            <title>{data?.postById?.title}</title>
            <meta name='description' content={data?.postById?.title} />

              {/* Twitter */}
<meta name="twitter:card" content={data?.postById?.title} key="twcard" />
<meta name="twitter:creator" content={data?.postById?.name || data?.postById?.createdByAccount?.profileSpace?.name} key="twhandle" />

{/* Open Graph */}
<meta property="og:url" content={`/watch/${vidId}`} key="ogurl" />
<meta property="og:image" content={`${IPFS_GATEWAY}${data?.postById?.body}`} key="ogimage" />
<meta property="og:site_name" content={`Poltube -  Decentralized video shring platform`} key="ogsitename" />
<meta property="og:title" content={data?.postById?.title} key="ogtitle" />
<meta property="og:description" content={data?.postById?.title} key="ogdesc" />
        </Head>
     
    <div className='min-h-screen bg-black '>
      <LivePage  vidId={vidId} />
    </div>
    
    </>
  )
}

export  async function getServerSideProps (context)  {
  const {streamId} = context.params
   const {data, loading, error, errors} = await client.query({
   query : GET_POST_BY_ID,
   variables : {
     "postByIdId": streamId
   }
   })

   return{
     props : {
       data : data,
       vidId : streamId,
       loading : loading,
       error : error || null
     }
   }
 }

