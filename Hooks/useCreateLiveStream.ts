// @ts-nocheck
import { useState, useEffect, useContext } from "react";
import polkadotjs from "../subsocial/wallets/polkadotjs";
import { SubsocialContext } from '../subsocial/provider'
import { LIVE_ID, SPACE_ID } from "../assets/constant";
import {IpfsContent, OptionBool} from '@subsocial/api/substrate/wrappers'
import { usePinToIpfs } from "./usePinToIpfs";

const useCreateLiveStream = () => {
  const {api, isReady} = useContext(SubsocialContext)
  const [isCreatingPost, setisCreatingPost] = useState(false)
  const [isCreatingPostError, setisCreatingPostError] = useState("")
  const [errorMessage, seterrorMessage] = useState("")
  const [currentUserInfo, setcurrentUserInfo] = useState()
  const [isPostCreated, setisPostCreated] = useState(false)
const [isApiConnected, setisApiConnected] = useState(true)
const [currentStatus, setcurrentStatus] = useState()
const [isFinalized, setisFinalized] = useState(false)
const [postId, setpostId] = useState()

const {uploadToIpfs} = usePinToIpfs()
useEffect(() => {
    const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
      setcurrentUserInfo(CONNECTED_USER_DETAILS)
}, [])

    const createPost = async (title, cover,  video, selectedSpace, startingTime, endingTime) =>  {
        if(!isReady){
            setisApiConnected(false)
        }
       // try{
            setisCreatingPost(true)
            const postContents = JSON.stringify({
                title: title,
                image: cover,
                tags: ["live"],
                 body: video,
                 appId :  LIVE_ID,
                 startingAt : startingTime,
                 endingAt :  endingTime,
            })
       
         const postCid  = await uploadToIpfs(postContents)
          console.log("the data i'm posting", postCid)
          const substrateApi = await api!.blockchain.api
    const postTx =  substrateApi.tx.posts.createPost(
        selectedSpace,
        { RegularPost: null }, // Creates a regular post.
        IpfsContent(postCid?.path)
      )
      await polkadotjs.signAndSendTx(postTx, currentUserInfo?.address, (result) => {
        const { status } = result

        if (status.isFinalized ) {
          const blockHash = status.isFinalized ? status.asFinalized : status.asInBlock
          setisPostCreated(true)
          console.log('Tx finalized. Block hash', blockHash.toString())
          
          const newIds = getNewIdsFromEvent(result) // get first argument from array.
          if (newIds.length > 0) {
            console.log(`New Item Id: ${newIds[0]}`)
            setpostId(`${newIds[0]}`)
          }
        
        } else if (result.isError) {
          console.log(JSON.stringify(result))
          setisCreatingPostError(true)
          seterrorMessage(JSON.stringify(result))
        } else {
          console.log('⏱ Current tx status:', status.type)
          setcurrentStatus(status.type)
          
        }
      })
    
      
      setisCreatingPost(false)
    }

    


return{
    createPost, isCreatingPost, isCreatingPostError,errorMessage,
    isPostCreated, currentStatus, postId
}
}
export default useCreateLiveStream