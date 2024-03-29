// @ts-nocheck

import { useDiscoverFromApp, useDiscoverVideos } from '@/Hooks'
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
 const {posts : data, isPostsLoading: loading, isPostsError: error} = useDiscoverFromApp()
 

  const filteredPosts = posts?.posts?.filter(post => post.hasOwnProperty("image") && post.image !== null)
  const filteredPosts_Two = data?.posts?.filter(post => post.hasOwnProperty("image") && post.image !== null)

  console.log("the hiden posts", filteredPosts)
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
    <div className='flex gap-4 flex-wrap items-center justify-center  xs:ml-0 md:ml-1 xs:mb-[40px] md:mb-0 '>
        {filteredPosts_Two?.map((video, i) =>  {

return(
  <VideoCard    key={i} video = {video}     />
)
})}
      {filteredPosts?.map((video, i) =>  {

        return(
          <VideoCard    key={i} video = {video}     />
        )
      })}
    </div>
  )
}
