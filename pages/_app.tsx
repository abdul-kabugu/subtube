// @ts-nocheck

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
import {LivepeerConfig, ThemeConfig, createReactClient, studioProvider} from "@livepeer/react"
import { livepeer_key } from '@/assets/constant'
import NextNProgress from 'nextjs-progressbar';
const Livepeer_client = createReactClient({
  provider: studioProvider({ apiKey: livepeer_key }),
});
  
const livepeerTheme: ThemeConfig = {
  colors: {
    accent: '#e879f9',
    containerBorderColor: 'rgba(0, 145, 255, 0.9)',
  },
  fonts: {
    display: 'Inter',
  },
};
export default function App({ Component, pageProps }: AppProps) {
  return (
     <ApolloProvider client={client}>
      <LivepeerConfig client={Livepeer_client} theme={livepeerTheme}>
      <SubsocialContextProvider>
    <div className='w-full'>
      <NextNProgress color='#9d33ad' height={5} options={{ showSpinner: false }} />
      <BetaAlert />
       <TopNav  />
      
    <Component {...pageProps} />
  
     <MobileNav  />
    </div>
    </SubsocialContextProvider>
    </LivepeerConfig>
    </ApolloProvider>
  
  ) 
}
