// @ts-nocheck

import {AiOutlineHome, AiOutlineHistory, AiOutlineTwitter, AiOutlineSetting, AiOutlinePlusCircle} from 'react-icons/ai'
import {BsCollection} from 'react-icons/bs'
import {FcAbout} from 'react-icons/fc'
import {toSubsocialAddress} from '@subsocial/utils'
import{ MdOutlineExplore, MdOutlineVideoLibrary, MdOutlinePrivacyTip } from "react-icons/md"
import {RiHomeLine} from 'react-icons/ri' 
import { HomeOutline, FeedOutline, FireOutline, DisconnectOutline, Discover, ExploreOutline, NewVideoOutline } from '@/Icons'
  import {CiUser, CiHome} from 'react-icons/ci'
  import {TbSettings} from 'react-icons/tb'
import {VscLibrary} from 'react-icons/vsc'

  let currentUserAddress 
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
      currentUserAddress = toSubsocialAddress(CONNECTED_USER_DETAILS?.address)
  }
export const navigations = [
    {
      title : "Home",
      to : "/",
      icon :  HomeOutline
    },
    
   {
        title : "Timeline",
        to : "/timeline",
        icon : FeedOutline
      },

     /* {
        title : "Library",
        to : "/library",
        icon : MdOutlineVideoLibrary
      },*/

      {
        title : "Explore",
        to : "/explore",
        icon : Discover
      },

     /* {
        title : "testing",
        to : "/test",
        icon : AiOutlineHistory
      },  */ 

]

export const mobileNavigations = [
  {
    title : "Home",
    to : "/",
    icon : HomeOutline
  },

  {
    title : "New Video",
    to : "/upload",
    icon : NewVideoOutline 
  },


  /*{
    title : "Subscriptions",
    to : "/subscribtions",
    icon : ExploreOutline
  },*/

{
    title : "Explore",
    to : "/explore",
    icon : Discover
  },
]

export const socialIcons = [
    {
        title : "Twitter",
        to : "twitter",
        icon : AiOutlineTwitter

    },

    {
        title : "About",
        to : "about",
        icon : FcAbout,


    },

    
    {
        title : "Privacy",
        to : "privacy",
        icon : MdOutlinePrivacyTip,


    },
]


 export const interests = [
  {
    title :"Spaces",
    symbol : "🌌" ,
  },
  {
    title :"Fails",
    symbol : "😅" ,
  },
  {
    title :"Crypto",
    symbol : "🌌" ,
  },
  {
    title :"Blockchain",
    symbol : "🔗" ,
  },
  {
    title :"Regular",
    symbol : "👮‍♀️" ,
  },
  {
    title :"Defi",
    symbol : "🏛" ,
  },
  {
    title :"Gamifi",
    symbol : "🎮" ,
  },
  {
    title :"Infrastructure",
    symbol : "🏙" ,
  },
  {
    title :"Social",
    symbol : "👥" ,
  },
  {
    title :"Interesting",
    symbol : "💫" ,
  },
  {
    title :"NFT",
    symbol : "📷" ,
  },
  {
    title :"Science",
    symbol : "🔭" ,
  },
 ]
export const videoCategories = [
  {
    title : "Podcasts",
    value : "podcast"
  },

  {
    title : "Programming",
    value : "programming"
  },

  {
    title : "Vehicles",
    value : "vehicles"
  },

  {
    title : "Education",
    value : "education"
  },
  {
    title : "DeFi",
    value : "defi"
  },
  {
    title : "SoFi",
    value : "SoFi"
  },

  {
    title : "NFTs",
    value : "nfts"
  },

  {
    title : "Gaming",
    value : "gaming"
  },
  {
    title : "Play 2 earn",
    value : "gaming"
  },

  {
    title : "Politics",
    value : "politics"
  },

  {
    title : "Technology",
    value : "technology"
  },

  
  {
    title : "Sports",
    value : "sports"
  },
]

 export const profilePop = [
  {
    title : "Your Channel",
     to : `/channel/${currentUserAddress}` || "channel",
     icon : CiUser
  },

  {
    title : "Channel Setting",
     to : "/settings",
     icon : AiOutlineSetting
  },


 
 ]
export const IPFS_GATEWAY = "https://ipfs.subsocial.network/ipfs/"
export  const IPFS_GATEWAY_TWO = "https://gateway.ipfscdn.io/ipfs/"
export const SPACE_ID = "11414"

 export const  fakeArray = [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12]
 export const  fakeArrayTwo = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 export const livepeer_key = process.env.NEXT_PUBLIC_LIVEPEER_KEY