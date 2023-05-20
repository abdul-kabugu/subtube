// @ts-nocheck

import { navigations } from "@/assets/constant"
import Link from "next/link"
import { useState } from "react"
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi"
import{ MdOutlineExplore, MdOutlineVideoLibrary } from "react-icons/md"
import {RiHomeLine} from 'react-icons/ri' 
import {CiSearch} from 'react-icons/ci'
import { ChevronLeftOutline, ChevronRightOutline } from "@/Icons"
import 'react-tippy/dist/tippy.css'
import {
  Tooltip,
} from 'react-tippy';
export default function Sidebar() {
  const [isExanded, setIsExapended] = useState(false)
  return (
    <div className={`${isExanded ? "w-[170px] " : "w-[90px] "} xs:hidden md:block  z-10  `}>

    <div className={`h-[92vh] bg-white ${!isExanded ? "w-[43px] bg-white pr-2 " : "w-[140px]"} fixed flex flex-col duration-700   `}>

         {navigations.map((nav, i) => {
          return(
             
              <Link href={nav.to} key={i}>
                <div className={` px-2 ${isExanded ? "mb-6 w-[125px]  " : "mb-3 w-[40px] h-[40px] flex-col"}  flex  items-center gap-2 hover:bg-gray-200 py-2  rounded-full `}>
                 <div>
                <Tooltip 
             key={i}
             title={nav.title}
             position="right"
             trigger="mouseenter"
             className={`${isExanded && "hidden"}`}
             > <nav.icon className={`text-black/80 ${isExanded ? "w-5 h-5" : "w-6 h-6"}  rounded-full `}/> 
            </Tooltip>
              </div>
                   <h3 className={`${! isExanded && "hidden"} font-semibold text-gray-600 text-sm `}>{nav.title}</h3>
                  
                </div>
              </Link>
             
            
          )
         })}
         <button className=" rounded-full mt-auto  mb-4 ">
           {isExanded ? (
            <ChevronLeftOutline  className="w-6 h-6"   onClick={() => setIsExapended(!isExanded)} />
           ) : (
            <ChevronRightOutline className="w-6 h-6" onClick={() => setIsExapended(!isExanded)} />
           )}
         </button>
   </div>
    </div>
  )
}
