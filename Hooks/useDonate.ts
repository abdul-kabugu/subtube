// @ts-nocheck
import {useState, useContext} from "react"
import { AiFillDingtalkSquare } from "react-icons/ai";
import { SubsocialContext } from "../subsocial/provider"
import polkadotjs from "../subsocial/wallets/polkadotjs";
import { convertAddressToChainFormat } from "../utils";
import {decodeAddress as SS58} from '@polkadot/util-crypto'
//import {} from "@polkadot/extension-dapp"

export const useDonate = () =>  {
    const [isDonating, setisDonating] = useState(false)
    const {api, isReady} = useContext(SubsocialContext)
    const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
    const currentConnectedUser = CONNECTED_USER_DETAILS?.address
   
    const donate = async (amount, recipient) => {
      const ss58Address = SS58(recipient, 42);
      console.log("the decoded address", ss58Address)
    const substrateApi = await api!.blockchain.api
     const transfer = substrateApi.tx.balances.transfer(ss58Address, 1);
       // Sign and Send the transaction
await polkadotjs.signAndSendTx(transfer, CONNECTED_USER_DETAILS?.address)
console.log("the space tx", spaceTransaction)
       
    }
      return{
        donate,
        isDonating,
     
      }
}





/* setisDonating(true)
        const convertedAddress = convertAddressToChainFormat(recipient, recipient)
         console.log("the convereted address", convertedAddress)
        const anotherAddress = SS58.encode(recipient, 42);
        console.log( "the ddress converetd now",  anotherAddress);
            const substrateApi = await api!.blockchain.api
            const transfer = substrateApi.tx.balances.transfer(anotherAddress, amount);
          
            // Sign and Send the transaction
await transfer.signAndSend(currentConnectedUser, ({ events = [], status }) => {
    if (status.isInBlock) {
      console.log('Successful transfer of ' + randomAmount + ' with hash ' + status.asInBlock.toHex());
    } else {
      console.log('Status of transfer: ' + status.type);
    }
  
    events.forEach(({ phase, event: { data, method, section } }) => {
      console.log(phase.toString() + ' : ' + section + '.' + method + ' ' + data.toString());
    });
  });

   setisDonating(false)
    }} */