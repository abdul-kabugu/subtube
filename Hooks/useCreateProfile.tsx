// @ts-nocheck
import { useState, useContext } from "react";
import polkadotjs from "../subsocial/wallets/polkadotjs";
import { SubsocialContext } from '../subsocial/provider'
import { SPACE_ID } from "../assets/constant";
import {IpfsContent, OptionBool} from '@subsocial/api/substrate/wrappers'


  export const useCreateProfile = () =>  {
    const [isCreatingProfile, setisCreatingProfile] = useState(false)
    const {api, isReady} = useContext(SubsocialContext)
    const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));

      const createProfile = async (about, avatar, name) =>  {
   setisCreatingProfile(true)
   const spaceCid = await api!.ipfs.saveContent({
    about: about,
     avatar : avatar,
      name : name
  })
  const substrateApi = await api!.blockchain.api
  /*const spaceTransaction = substrateApi.tx.spaces.createSpace(
    IpfsContent(spaceCid),
    null // Permissions config (optional)
  )*/
  const spaceTransaction = await substrateApi.tx.profiles.createSpaceAsProfile(
    IpfsContent(spaceCid)
  )
  await polkadotjs.signAndSendTx(spaceTransaction, CONNECTED_USER_DETAILS?.address)
   console.log("the create profile tx is here", spaceTransaction)
}

 return{
    createProfile,
    isCreatingProfile
 }
  }