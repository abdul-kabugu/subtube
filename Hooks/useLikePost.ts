// @ts-nocheck
import { useState, useContext } from "react";
import polkadotjs from "../subsocial/wallets/polkadotjs";
import { SubsocialContext } from '../subsocial/provider'

const useReactions = () =>  {
    const [isLikeLoading, setisLikeLoading] = useState(false)
    const [isDeslikeLoading, setisDeslikeLoading] = useState(false)
    const {api, isReady} = useContext(SubsocialContext)
    const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
    const likePost = async (postId) =>  {
        setisLikeLoading(true)
        const substrateApi = await api!.blockchain.api
        const reactionTx = substrateApi.tx.reactions.createPostReaction(postId, 'Upvote')
        await polkadotjs.signAndSendTx(reactionTx, CONNECTED_USER_DETAILS?.address)
        console.log("the post transactions", reactionTx)
        setisLikeLoading(false)
    }

    const deslikePost = async (postId) =>  {
          setisDeslikeLoading(true)
        const substrateApi = await api!.blockchain.api
        const reactionTx = substrateApi.tx.reactions.createPostReaction(postId, 'Downvote')
        await polkadotjs.signAndSendTx(reactionTx, CONNECTED_USER_DETAILS?.address)
        console.log("the post transactions", reactionTx)
       setisDeslikeLoading(false)
    }
      
    return {
      isLikeLoading,
      isDeslikeLoading,
      likePost,
      deslikePost
    }
}
export default useReactions