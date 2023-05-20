import {useState} from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function BetaAlert() {
    const [isShowAnnouncement, setisShowAnnouncement] = useState(true)
    const toggleIsShow = () => {
        setisShowAnnouncement(!isShowAnnouncement)
    }
  return (
    <div className='bg-violet-500 flex items-center justify-center relative xs:hidden md:flex'>
           {isShowAnnouncement && <> <h1 className='font-mono text-white'>We are still in beta, Things Might break. Handle us gently </h1>
            <div className='absolute right-3 cursor-pointer text-white' onClick={toggleIsShow}>
                <AiOutlineClose  />
            </div>  </>
}
  </div>
  )
}
