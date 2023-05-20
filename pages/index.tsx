import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { TopNav } from '@/components/navigations'
import { HomeView } from '@/components/home'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="keywords" content="decentralized video sharing platform, Subsocial network, video sharing, social media, community-driven platform, social-Fi, deFi, polkadot social, subsocial network"/>
        <meta name="description" content="Frentube |Decentralized Video Sharing Platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

          {/* Twitter */}
<meta name="twitter:card" content={`Discover a decentralized video sharing platform built on Subsocial network. Frentube empowers creators to share and engage with a global community. Explore, upload, and connect today`} key="twcard" />
<meta name="twitter:creator" content={`FrenTube`} key="twhandle" />

{/* Open Graph */}
<meta property="og:url" content={`/`} key="ogurl" />
<meta property="og:image" content={`/img/cover.png`} key="ogimage" />
<meta property="og:site_name" content={`Poltube -  Decentralized video shring platform`} key="ogsitename" />
<meta property="og:title" content={`Decentralized video-shring platform `} key="ogtitle" />
<meta property="og:description" content={`FrenTube - Decentralized video-shring platform on subsocial`} key="ogdesc" />
      </Head>
      <main>
        <div className="w-full">
         <HomeView  />
        </div>
      </main>
    </>
  )
}
