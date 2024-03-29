// @ts-nocheck
import { client } from '@/graphql/apolloClient'
import { GET_ACCOUNT_DEARCH_QUERY } from '@/graphql/fragments/accountSearchQuery'
import { SEARCH_VIDEO_QUERY } from '@/graphql/fragments/videoSearchQuery'
import {CiSearch} from 'react-icons/ci'
import {useState, useEffect} from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import ChannelQuery from '../ChannelQuery'
import VideoQuery from '../VideoQuery'
import { SPACE_ID } from '@/assets/constant'
// xs:hidden md:flex md:w-[330px] lg:w-[420px] border border-gray-200 rounded-md flex items-center gap-2 justify-between px-2
// w-2/3 hidden md:px-4 max-w-lg items-center h-8 rounded-2xl sm:flex bg-black/20 text-sm border border-fuchsia-900/50 tracking-tight px-1.5 font-normal gap-2 justify-between
export default function Search() {
    const [searchQuery, setsearchQuery] = useState("")
    const [isShowSearch, setisShowSearch] = useState(true)
    const [searchResults, setsearchResults] = useState()
    const [currentTab, setcurrentTab] = useState("VIDEOS")
    const [isSearchDataLoading, setisSearchDataLoading] = useState()
const [isSearchDataError, setisSearchDataError] = useState()
      //FETCH  QUERY FUNCTION

       const  fetchQueries = async () =>  {
          if(currentTab === "VIDEOS" && searchQuery.length > 0){
           const {data, loading, error} = await client.query({
             query : SEARCH_VIDEO_QUERY,
             variables : {
              where : {
                "title_containsInsensitive": searchQuery,
                "AND": [
                  {
                    "space": {
                      "id_eq": SPACE_ID
                    }
                  }
                ]
              }
             }
           })

           setsearchResults(data)
           setisSearchDataLoading(loading)
           setisSearchDataError(error)
          }else if(currentTab  === "CHANNELS" && searchQuery.length > 0){
            const {data, loading, error} = await client.query({
              query : GET_ACCOUNT_DEARCH_QUERY,
              variables : {
                where : {
                  profileSpace : {
                    "name_containsInsensitive": searchQuery
                  }
                }
              }
            })
   console.log("the data", data)
            setsearchResults(data)
            setisSearchDataLoading(loading)
            setisSearchDataError(error)
          }

       }

        // FILTER  TABS 
   console.log("the data from filter", searchResults)

   useEffect(() => {
     fetchQueries()

   
     
   }, [searchQuery, currentTab])
   

         const getCurrentTab = () => {
            if(currentTab  === "VIDEOS") {
              return(
              <VideoQuery  data = {searchResults} loading = {isSearchDataLoading} error = {isSearchDataError} />
              )
            }else if(currentTab  === "CHANNELS"){
              return(
                <ChannelQuery  data = {searchResults} loading = {isSearchDataLoading} error = {isSearchDataError}  />
              )
            }
         }
  return (
  
     <div className=' xs:hidden md:flex  relative  '>
    <div className='w-full hidden md:px-4 max-w-lg items-center h-8 rounded-2xl sm:flex bg-black/20 text-sm border border-fuchsia-900/50 tracking-tight px-1.5 font-normal gap-2 justify-between
'>
        <input  type="text"  value={searchQuery} onChange ={e => setsearchQuery(e.target.value)}
          placeholder="Search videos or channels"
          className='xs:hidden md:block md:w-[330px] lg:w-[420px] py-1 px-3 rounded-md focus:outline-none bg-inherit '
        />
        <CiSearch className="text-gray-500 cursor-pointer w-6 h-6" size={18} />

        
    </div>
    {searchQuery.length > 0 && (
             <div className='absolute bg-black  z-10 w-[100%] top-10 py-2 px-3 rounded-md border border-fuchsia-900/50 shadow-2xl '>
               <div className='flex gap-2 justify-between mb-5 py-2 font-semibold px-3'>
                 <button className={`${currentTab === "VIDEOS" ? "text-gray-400 border-b-2  pb-2 border-violet-700" : "text-gray-400"}  w-2/5 `} onClick={() => setcurrentTab("VIDEOS")}>Videos</button>
                  <button className={`${currentTab === "CHANNELS" ? "text-gray-400 border-b-2  pb-2 border-violet-700" : "text-gray-400"}  w-2/5 `} onClick={() => setcurrentTab("CHANNELS")}>Channels</button>
               </div>
               {getCurrentTab()}
                
             </div>
          )}
    </div>
   
  )
}
