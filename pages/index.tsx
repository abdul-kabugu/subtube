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
        <meta name="description" content="Frentube | Decentralized Video Sharing Platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
  </Head>
      <main>
        <div className="w-full bg-inherit">
         <HomeView  />
        </div>
      </main>
    </>
  )
}
