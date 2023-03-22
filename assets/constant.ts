import {AiOutlineHome, AiOutlineHistory, AiOutlineTwitter} from 'react-icons/ai'
import {BsCollection} from 'react-icons/bs'
import {MdOutlineVideoLibrary, MdOutlinePrivacyTip} from 'react-icons/md'
import {FcAbout} from 'react-icons/fc'
export const navigations = [
    {
      title : "Home",
      to : "/",
      icon : AiOutlineHome
    },
    
   /* {
        title : "Subscribtions",
        to : "/subscribtions",
        icon : BsCollection
      },*/

      {
        title : "Library",
        to : "/library",
        icon : MdOutlineVideoLibrary
      },

      {
        title : "History",
        to : "/history",
        icon : AiOutlineHistory
      },

      {
        title : "testing",
        to : "/test",
        icon : AiOutlineHistory
      },   

]

export const mobileNavigations = [
  {
    title : "Home",
    to : "/",
    icon : AiOutlineHome
  },

  {
    title : "Library",
    to : "/library",
    icon : MdOutlineVideoLibrary
  },

  {
    title : "History",
    to : "/history",
    icon : AiOutlineHistory
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

export const IPFS_GATEWAY = "https://ipfs.subsocial.network/ipfs/"
export const SPACE_ID = 1080

 export const  fakeArray = [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12]
 export const  fakeArrayTwo = [1, 2, 3, 4, 5, 6]