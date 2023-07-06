// @ts-nocheck
import { useState, useEffect, useContext } from "react";
import polkadotjs from "../subsocial/wallets/polkadotjs";
import { SubsocialContext } from '../subsocial/provider'
import { SPACE_ID } from "../assets/constant";
import {IpfsContent, OptionBool} from '@subsocial/api/substrate/wrappers'
import { usePinToIpfs } from "./usePinToIpfs";

const useCreatePost = () => {
  const {api, isReady} = useContext(SubsocialContext)
  const [isCreatingPost, setisCreatingPost] = useState(false)
  const [isCreatingPostError, setisCreatingPostError] = useState("")
  const [errorMessage, seterrorMessage] = useState("")
  const [currentUserInfo, setcurrentUserInfo] = useState()
  const [isPostCreated, setisPostCreated] = useState(false)
const [isApiConnected, setisApiConnected] = useState(true)
const {uploadToIpfs} = usePinToIpfs()
useEffect(() => {
    const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
      setcurrentUserInfo(CONNECTED_USER_DETAILS)
}, [])

    const createPost = async (title, cover,  tags, video, selectedSpace) =>  {
        if(!isReady){
            setisApiConnected(false)
        }
       // try{
            setisCreatingPost(true)
            const postContents = JSON.stringify({
                title: title,
                image: cover,
                tags: [tags],
                 body: video,
                 appId : "frentube_1"
            })
       
         const postCid  = await uploadToIpfs(postContents)
          console.log("the data i'm posting", postCid)
          const substrateApi = await api!.blockchain.api
    const postTx =  substrateApi.tx.posts.createPost(
        selectedSpace,
        { RegularPost: null }, // Creates a regular post.
        IpfsContent(postCid?.path)
      )
      await polkadotjs.signAndSendTx(postTx, currentUserInfo?.address)
      console.log("the post transactions", postTx)
      setisPostCreated(true)
      setisCreatingPost(false)
    }

    


return{
    createPost, isCreatingPost, isCreatingPostError,errorMessage,
    isPostCreated
}
}
export default useCreatePost