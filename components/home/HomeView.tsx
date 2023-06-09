// @ts-nocheck

import { useDiscoverVideos } from '@/Hooks'
import { SubsocialContext } from '@/subsocial/provider'

import {useState, useContext} from 'react'
import {fakeArray} from '../../assets/constant'
import { VideoCard } from '../cards'
import { Error } from '../errors'
import VideoCardSkeleton from '../Loder/VideoCardSkeleton'


export default function HomeView() {
 const [isYess, setisYess] = useState(true)

  const [isLoading, setisLoading] = useState(true)
  const {posts, isPostsLoading, isPostsError} = useDiscoverVideos()
 

  const filteredPosts = posts?.posts?.filter(post => post.hasOwnProperty("image") && post.image !== null)

  if(isPostsError) {
    return(
      <Error   /> 
    )
  }

   if(isPostsLoading){
    return(
     <VideoCardSkeleton  />
    )
   }
  return (
    <div className='flex gap-3 flex-wrap items-center  xs:ml-0 md:ml-1 xs:mb-[40px] md:mb-0 '>
      {filteredPosts?.map((video, i) =>  {

        return(
          <VideoCard    key={i} video = {video}     />
        )
      })}
    </div>
  )
}
