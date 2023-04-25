import { navigations } from "@/assets/constant"
import Link from "next/link"
import { useState } from "react"
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi"
import{ MdOutlineExplore, MdOutlineVideoLibrary } from "react-icons/md"
import {RiHomeLine} from 'react-icons/ri' 
import {CiSearch} from 'react-icons/ci'

export default function Sidebar() {
  const [isExanded, setIsExapended] = useState(false)
  return (
    <div className={`${isExanded ? "w-[190px] " : "w-[90px] "} xs:hidden md:block  z-10  `}>

    <div className={`h-[92vh] bg-white ${!isExanded ? "w-[50px]" : "w-[140px]"} fixed flex flex-col duration-700 ease-in-out  `}>

         {navigations.map((nav, i) => {
          return(
             
              <Link href={nav.to} key={i}>
                <div className={` px-2 ${isExanded ? "mb-6" : "mb-3"}  flex items-center gap-3 hover:bg-gray-200 py-2  rounded-full `}>
                  <nav.icon className={`text-black/60 ${isExanded ? "w-5 h-5" : "w-9 h-8"}  rounded-full `}/>
                   <h3 className={`${ !isExanded ? "hidden" : "block" } font-semibold text-gray-600 text-sm `}>{nav.title}</h3>
                </div>
              </Link>
            
          )
         })}
         <button className=" rounded-full mt-auto  mb-4 ">
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
