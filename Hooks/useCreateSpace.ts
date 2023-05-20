// @ts-nocheck
import {IpfsContent, OptionBool} from '@subsocial/api/substrate/wrappers'
import {SubsocialContext} from '../subsocial/provider'
import {useContext, useState, useEffect} from 'react'
import polkadotjs from '../subsocial/wallets/polkadotjs'
import { usePinToIpfs } from './usePinToIpfs'

const useCreateSpace = () =>  {
    const {api, isReady, } = useContext(SubsocialContext)
    const [spaceId, setspaceId] = useState("")
    const [isCreatingSpace, setisCreatingSpace] = useState(false)
    const [isCreatigSpaceError, setisCreatigSpaceError] = useState(false)
    const [creatingSpaceErrorMessage, setcreatingSpaceErrorMessage] = useState("")
    const [isApiConnected, setisApiConnected] = useState(true)
    const {uploadToIpfs} = usePinToIpfs()
      /*useEffect(() => {
        const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
      }, [])*/
      
   
  const createSpace = async (about, image, name, tags) =>  {
    if(! isReady){
        setisApiConnected(false)
    }
        try{
            setisCreatingSpace(true)
    const spaceContents = JSON.stringify({
        about:
          'Poltube  is  a decentralized  video  streaming  website ',
        image: null,
        name: 'Poltube',
        tags: ['poltube'],
      })
  const spaceCID = await uploadToIpfs(spaceContents)
      const substrateApi = await api!.blockchain.api

      const spaceTransaction = substrateApi.tx.spaces.createSpace(
        IpfsContent(spaceCID?.path),
          {"everyone" : null}




     )

     await polkadotjs.signAndSendTx(spaceTransaction, CONNECTED_USER_DETAILS?.address)
      console.log("the space tx", spaceTransaction)
  } catch (error) {
    setisCreatigSpaceError(true)
    setisCreatingSpace(false)
    setcreatingSpaceErrorMessage(error)
    console.log("Error creating  space", error)
  }

}
  return{
    createSpace
  }
}
export default useCreateSpace