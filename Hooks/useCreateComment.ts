// @ts-nocheck
import { useState, useContext } from "react";
import polkadotjs from "../subsocial/wallets/polkadotjs";
import { SubsocialContext } from '../subsocial/provider'
import { SPACE_ID } from "../assets/constant";
import {IpfsContent, OptionBool} from '@subsocial/api/substrate/wrappers'

const useCreateComment = () => {
    const {api, isReady} = useContext(SubsocialContext)
    const [isCommenting, setisCommenting] = useState(false)
    const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));

    const commentToPost = async (body, parentId) =>  {
        try{
        setisCommenting(true)
        const commentCid = await api!.ipfs.saveContent({
             body: body,
             appId : "poltubeApp_1"
          })

          const substrateApi = await api!.blockchain.api

          const postTx =  substrateApi.tx.posts.createPost(
            SPACE_ID,
            { Comment: { parentId: null, rootPostId:  parentId} }, // Creates a regular post.
            IpfsContent(commentCid)
          )

          await polkadotjs.signAndSendTx(postTx, CONNECTED_USER_DETAILS?.address)
          console.log("the post transactions", postTx)
          setisCommenting(false)

    } catch(error){
         alert(error)
         setisCommenting(false)
    }}

    return {
        commentToPost,
        isCommenting
    }
}

export default useCreateComment