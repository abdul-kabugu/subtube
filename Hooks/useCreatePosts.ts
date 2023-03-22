// @ts-nocheck
import { useState, useEffect, useContext } from "react";
import polkadotjs from "../subsocial/wallets/polkadotjs";
import { SubsocialContext } from '../subsocial/provider'
import { SPACE_ID } from "../assets/constant";
import {IpfsContent, OptionBool} from '@subsocial/api/substrate/wrappers'

const useCreatePost = () => {
  const {api, isReady} = useContext(SubsocialContext)
  const [isCreatingPost, setisCreatingPost] = useState(false)
  const [isCreatingPostError, setisCreatingPostError] = useState("")
  const [errorMessage, seterrorMessage] = useState("")
  const [currentUserInfo, setcurrentUserInfo] = useState()
  const [isPostCreated, setisPostCreated] = useState(false)
const [isApiConnected, setisApiConnected] = useState(true)
useEffect(() => {
    const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
      setcurrentUserInfo(CONNECTED_USER_DETAILS)
}, [])

    const createPost = async (title, cover,  tags, video) =>  {
        if(!isReady){
            setisApiConnected(false)
        }
       // try{
            setisCreatingPost(true)
        const postCid = await api!.ipfs.saveContent({
            title: title,
            image: cover,
            tags: [tags],
             body: video
          })

          const substrateApi = await api!.blockchain.api
    const postTx =  substrateApi.tx.posts.createPost(
        SPACE_ID,
        { RegularPost: null }, // Creates a regular post.
        IpfsContent(postCid)
      )
      await polkadotjs.signAndSendTx(postTx, currentUserInfo?.address)
      console.log("the post transactions", postTx)
      setisPostCreated(true)
      setisCreatingPost(false)
    }/*catch (error) {
       setisCreatingPost(false)
       seterrorMessage(error)
       setisCreatingPostError(true)
       alert("something went wrong when creating post", error)
    }*/

    


return{
    createPost, isCreatingPost, isCreatingPostError,errorMessage,
    isPostCreated
}
}
export default useCreatePost