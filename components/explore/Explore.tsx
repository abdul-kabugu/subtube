import {useState} from 'react'
import { AiOutlineFieldTime, AiOutlineFire, AiOutlineRetweet, AiOutlineThunderbolt } from 'react-icons/ai'
import { BsRocketTakeoff } from 'react-icons/bs'
import { TbSquare0Filled, TbSquareRounded } from 'react-icons/tb'
import InterestingTab from './InterestingTab'
import LatestTab from './LatestTab'
import Popular from './Popular'
import TrendingTab from './TrendingTab'

export default function Explore() {
    const [currentTab, setcurrentTab] = useState(0)

     const getCurrentTab = () =>  {
        if(currentTab  === 0) {
            return(
                <TrendingTab  />
            )
        }else if(currentTab === 1){
            return(
                <LatestTab  />

            )
        }else if(currentTab === 2) {
            return(
                <Popular  />
            )
        }else if(currentTab  === 3) {
            return(
                 <InterestingTab  />
            )
        }
     }
  return (
    <div className='w-fit  xs:w-screen md:w-auto'>
        <div className="flex gap-3  max-w-full overflow-x-scroll" >
            <div className={`flex gap-1 items-center cursor-pointer xs:px-2 md:px-5 ${currentTab === 0 && "border-b-2 border-violet-600"}`} onClick={() => setcurrentTab(0)}>
                <AiOutlineFire size={18}  />
                 <button className='font-semibold leading-10 text-lg text-black/70'>Trending</button>
            </div>

            <div className={`flex gap-1 items-center cursor-pointer xs:px-2 md:px-5 ${currentTab === 1 && "border-b-2 border-violet-600"}`} onClick={() => setcurrentTab(1)}>
                <AiOutlineFieldTime size={18}  />
                 <button className='font-semibold leading-10 text-lg text-black/70'>Latest</button>
            </div>

            <div className={`flex gap-1 items-center cursor-pointer xs:px-2 md:px-5 ${currentTab === 2 && "border-b-2 border-violet-600"}`} onClick={() => setcurrentTab(2)}>
                <AiOutlineThunderbolt size={18} />
                <button className='font-semibold leading-10 text-lg text-black/70'>Popular</button>
            </div>

            <div className={`flex gap-1 items-center cursor-pointer xs:px-2 md:px-5 ${currentTab === 3 && "border-b-2 border-violet-600"}`} onClick={() => setcurrentTab(3)}>
                <TbSquareRounded size={15} />
                <button className='font-semibold leading-10 text-lg text-black/70'>Interesting</button>
            </div>
        </div>

        <div className='mt-5'>
            {getCurrentTab()}
        </div>
        </div>
    
  )
}
