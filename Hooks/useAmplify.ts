// @ts-nocheck
import { useQuery } from "@apollo/client";
import { useState, useContext } from "react";
import polkadotjs from "../subsocial/wallets/polkadotjs";
import { SubsocialContext } from '../subsocial/provider'
import { SPACE_ID } from "../assets/constant";
import {IpfsContent, OptionBool} from '@subsocial/api/substrate/wrappers'
import { usePinToIpfs } from "./usePinToIpfs";
import { APP_ID } from "../assets/constant";
 export const useAmplify = () =>  {
   const [isAmplifying, setisAmplifying] = useState(false)
   const {api, isReady} = useContext(SubsocialContext)
   const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
   const {uploadToIpfs} = usePinToIpfs()
     const amplifyPost  =  async (parentId, video) =>  {
        setisAmplifying(true)
       // Creating new sharedPostCid having shared message.
    /* const sharedPostCid = await await api!.ipfs.saveContent({
    body: video?.postById?.body,
    image : video?.postById?.image,
    title : video?.postById?.title,
     appId : "poltube_v3"
  })*/
  const sharedPostContent = JSON.stringify({
    body: video?.postById?.body,
    image : video?.postById?.image,
    title : video?.postById?.title,
     appId : APP_ID
  })

  const sharedPostCid = await uploadToIpfs(sharedPostContent)
  const substrateApi = await api!.blockchain.api
  const amplifyTx = substrateApi.tx.posts.createPost(
    SPACE_ID, 
    { SharedPost: parentId }, // Creates a shared post.
    IpfsContent(sharedPostCid?.path)) 

    await polkadotjs.signAndSendTx(amplifyTx, CONNECTED_USER_DETAILS?.address)
    setisAmplifying(false)
    console.log("the post transactions", amplifyTx)
     }

     return{
        amplifyPost, isAmplifying
     }
 }