// @ts-nocheck


import { useDonate, useTruncateText } from '@/Hooks'
import { SubsocialContext } from '@/subsocial/provider'
import polkadotjs from '@/subsocial/wallets/polkadotjs'
import {useState, useContext} from 'react'
import {decodeAddress as SS58} from '@polkadot/util-crypto'


export default function TipUser({video}) {
    const {shortenTxt} = useTruncateText()
    const [amount, setamount] = useState("")
    const [balance, setBalance] = useState(null);
    const [isDonating, setisDonating] = useState(false)
    const {api, isReady} = useContext(SubsocialContext)
    const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
    const currentConnectedUser = CONNECTED_USER_DETAILS?.address


    const donate = async () => {
        const ss58Address = SS58(video?.postById?.createdByAccount?.id, 42);
        console.log("the decoded address", ss58Address)
      const substrateApi = await api!.blockchain.api
       const transfer = substrateApi.tx.balances.transfer(ss58Address, amount);
         // Sign and Send the transaction
    await polkadotjs.signAndSendTx(transfer, CONNECTED_USER_DETAILS?.address)
    console.log("the space tx", transfer)
         
      }
  return (
    <div>
     <div className='flex gap-2 flex-col'>
        <h1>Amount</h1>
        <input  value={amount} onChange={e => setamount(e.target.value)} placeholder="10 SUB" 
          className='py-1 px-4 w-[100%] focus:outline-none border border-gray-300 mb-3 rounded-md'
        />
     </div>

     <button className='bg-violet-700 hover:bg-violet-500 text-white w-[100%] py-1.5 px-4 rounded-md' onClick={() => donate()}>{isDonating ? "Sending Tip.." : "Send Tip"} </button>
    </div>
  )
}
