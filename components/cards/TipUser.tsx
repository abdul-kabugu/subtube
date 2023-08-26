// @ts-nocheck


import { useDonate, useTruncateText } from '@/Hooks'
import { SubsocialContext } from '@/subsocial/provider'
import polkadotjs from '@/subsocial/wallets/polkadotjs'
import {useState, useContext} from 'react'
import {decodeAddress as SS58} from '@polkadot/util-crypto'
import { sponsorPeriods, tipsTires } from '@/assets/constant'


export default function TipUser({video}) {
    const {shortenTxt} = useTruncateText()
    const [amount, setamount] = useState("")
    const [balance, setBalance] = useState(null);
    const [isDonating, setisDonating] = useState(false)
    const {api, isReady} = useContext(SubsocialContext)
    const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
    const currentConnectedUser = CONNECTED_USER_DETAILS?.address
 const [selectedTier, setselectedTier] = useState(0)
const [amountToDonate, setamountToDonate] = useState(1)

 const getBlanceOfThis = async () => {
  const substrateApi = await api!.blockchain.api
  //const balance = await substrateApi.query.system.account(currentConnectedUser)
  const { data: { free: currentBalance } } = await substrateApi.query.system.account(currentConnectedUser);
  
  console.log("the balance", currentBalance.toString())
 }

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
    {/*} <div className='flex gap-2 flex-col'>
        <h1>Amount</h1>
        <input  value={amount} onChange={e => setamount(e.target.value)} placeholder="10 SUB" 
          className='py-1 px-4 w-[100%] focus:outline-none border border-gray-300 mb-3 rounded-md'
        />
  </div>*/}
   
  <div className='flex gap-3 justify-center '>
  {/*sponsorPeriods.map((item, i) => {
    return(
      <div key={i} className={`border ${selectedTier === i && "bg-fuchsia-700 text-white"} border-fuchsia-900/60 py-1.5 px-3 rounded-lg cursor-pointer`} onClick={() => setselectedTier(i)}>
        <p>{item} </p>
         </div>
    )
  })*/}
  </div>

  <div className='flex gap-4 flex-wrap justify-center my-6'>
    {tipsTires.map((tip, i) => {
      return(
        <div key={i} onClick={() => setamountToDonate(tip.amount)} className={`flex ${tip.amount === amountToDonate && "border-fuchsia-800 bg-fuchsia-700 text-white"} gap-2 border border-fuchsia-900/50 py-2 px-4 rounded-lg cursor-pointer`}> 
          <p>{tip.emoji}</p>
          <p>{tip.title}</p>
        </div>
      )
    })}
  </div>

     <button className='bg-fuchsia-700 my-3 hover:bg-fuchsia-600 text-white w-[100%] py-1.5 px-4 rounded-md' onClick={() => donate()}>{isDonating ? "Sending Tip.." : "Tip User"} </button>
    </div>
  )
}
