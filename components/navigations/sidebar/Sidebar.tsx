import { navigations } from "@/assets/constant"
import Link from "next/link"
import { useState } from "react"
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi"
import{ MdOutlineExplore, MdOutlineVideoLibrary } from "react-icons/md"
import {RiHomeLine} from 'react-icons/ri' 

export default function Sidebar() {
  const [isExanded, setIsExapended] = useState(false)
  return (
    <div className={`${isExanded ? "w-[190px] " : "w-[90px] "} xs:hidden md:block  z-10 `}>

    <div className={`h-[92vh] bg-white  fixed flex flex-col duration-700 ease-in-out  px-1`}>

         {navigations.map((nav, i) => {
          return(
             
              <Link href={nav.to}>
                <div className={`${! isExanded && "w-[65px]  rounded-full" } px-3 mb-6 flex items-center gap-3 hover:bg-gray-200 py-2  rounded-lg `}>
                  <nav.icon className="text-gray-700" size={28}/>
                   <h3 className={`${ !isExanded ? "hidden" : "block" } font-semibold text-gray-600 `}>{nav.title}</h3>
                </div>
              </Link>
            
          )
         })}
         <button className=" rounded-full   mt-auto ml-auto mb-4 pr-3 flex items-end justify-end">
           {isExanded ? (
            <HiChevronLeft  className="text-black/70" size={37}  onClick={() => setIsExapended(!isExanded)} />
           ) : (
            <HiChevronRight className="text-black/70" size={37} onClick={() => setIsExapended(!isExanded)} />
           )}
         </button>
   </div>
    </div>
  )
}
