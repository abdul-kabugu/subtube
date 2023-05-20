import BetaAlert from '@/components/BetaAlert'
import { TopNav } from '@/components/navigations'
import { MobileNav } from '@/components/navigations/mobilenav'
import { Sidebar } from '@/components/navigations/sidebar'
import { client } from '@/graphql/apolloClient'
import '@/styles/globals.css'
import { SubsocialContextProvider } from '@/subsocial/provider'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { useState } from 'react'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SubsocialContextProvider>
    <div className='w-full'>
      <BetaAlert />
       <TopNav  />
       <div className='flex gap-1 w-full'>
         <Sidebar  />
    <Component {...pageProps} />
    </div>
     <MobileNav  />
    </div>
    </SubsocialContextProvider>
    </ApolloProvider>
  ) 
}
