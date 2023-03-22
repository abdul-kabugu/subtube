// @ts-nocheck
import {useState} from 'react'
 const useAuthenticate = () =>  {
    const [isNoExtension, setisNoExtension] = useState(false)
    const [userWallets, setuserWallets] = useState()
    
   const connectWallet  = async () => {
    const { isWeb3Injected, web3Enable, web3Accounts } = await import(
        '@polkadot/extension-dapp'
      )
      const injectedExtensions = await web3Enable('PolTube')
      if (!isWeb3Injected) {
        setisNoExtension(true)
      }
      const userAccounts =  await await web3Accounts()
      setuserWallets(userAccounts)
      
   }

   return{
    userWallets, connectWallet, isNoExtension
   }
 }
 export default useAuthenticate