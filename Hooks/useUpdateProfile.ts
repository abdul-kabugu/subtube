// @ts-nocheck
import { useState, useContext } from "react";
import polkadotjs from "../subsocial/wallets/polkadotjs";
import { SubsocialContext } from '../subsocial/provider'
import { SPACE_ID } from "../assets/constant";
import {IpfsContent, OptionBool} from '@subsocial/api/substrate/wrappers'
import { usePinToIpfs } from "./usePinToIpfs";

  export const useUpdateProfile = () =>  {
    const [isUpdatingProfile, setisUpdatingProfile] = useState(false)
    const {api, isReady} = useContext(SubsocialContext)
    const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
const {uploadToIpfs} = usePinToIpfs()
      const updateProfile = async (about, avatar, name, spaceId) =>  {
   setisUpdatingProfile(true)
   const spaceContents = JSON.stringify({
    about: about,
     avatar : avatar,
      name : name
  })
   const spaceCID = await uploadToIpfs(spaceContents)
  const substrateApi = await api!.blockchain.api
  /*const spaceTransaction = substrateApi.tx.spaces.createSpace(
    IpfsContent(spaceCid),
    null // Permissions config (optional)
  )*/
  const spaceTransaction =  substrateApi.tx.spaces.updateSpace(
    spaceId, IpfsContent(spaceCID?.path)
  )
  await polkadotjs.signAndSendTx(spaceTransaction, CONNECTED_USER_DETAILS?.address)
   console.log("the create profile tx is here", spaceTransaction)
}

 return{
    updateProfile,
    isUpdatingProfile
 }
  }