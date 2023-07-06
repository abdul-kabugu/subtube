// @ts-nocheck
import { useTruncateText } from '@/Hooks'
import Link from 'next/link'
import {} from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { HiOutlineDatabase } from 'react-icons/hi'
export default function VideoQuery({data, loading, error}) {

  const {shortenTxt} = useTruncateText()
  if(data?.posts?.length === 0) {
    return(
       <div className='flex items-center flex-col'>
        <h1 className='text-gray-600 text-sm'>No Videos found</h1>
         <HiOutlineDatabase className='w-[13px text-gray-400]' />
       </div>
    )
  }

   if(loading) {
    return(
      <h1>Loading</h1>
    )
   }
  return (
    <div>
        {data?.posts?.map((post, i) =>  {

          return(
            <Link href={`/watch/${post?.id}`} key={i}>
            <div className='flex items-center justify-between mb-2'>
               <h2 className='font-semibold capitalize text-gray-400 '>{post && shortenTxt(post.title, 25)}</h2>
                 <div className='flex gap-1 items-center'>
                  <AiOutlineLike size={12} className="text-gray-400" />
                   <p className='text-[14px] text-gray-500'>{post?.upvotesCount}</p>
                 </div>
            </div>
            </Link>
          )
        })}
    </div>
  )
}
