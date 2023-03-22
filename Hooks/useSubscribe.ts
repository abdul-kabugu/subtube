// @ts-nocheck
import {IpfsContent, OptionBool} from '@subsocial/api/substrate/wrappers'
import {SubsocialContext} from '../subsocial/provider'
import {useContext, useState, useEffect} from 'react'
import polkadotjs from '../subsocial/wallets/polkadotjs'

export const UseSubscribe = () => {
    const {api, isReady, } = useContext(SubsocialContext)
    const [isSubscribing, setisSubscribing] = useState(false)
    const [currentUserInfo, setcurrentUserInfo] = useState()
   // const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
   useEffect(() => {
      const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
   setcurrentUserInfo(CONNECTED_USER_DETAILS)
  
   
  }, [])
     const subscribe = async (acountId) => {
        setisSubscribing(true)
        const substrateApi = await api!.blockchain.api
        const tx = substrateApi.tx.accountFollows.followAccount(acountId)
        await polkadotjs.signAndSendTx(tx, CONNECTED_USER_DETAILS?.address)
      console.log("the space tx", tx)
      setisSubscribing(false)
     }

     return {
        subscribe,
        isSubscribing
     }
}