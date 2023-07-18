// @ts-nocheck

import { IPFS_GATEWAY, IPFS_GATEWAY_TWO } from '@/assets/constant';
import React from 'react'
import {Player} from '@livepeer/react'
//import { Player, BigPlayButton,  LoadingSpinner , ControlBar} from 'video-react';
import 'video-react/dist/video-react.css';
import Image from 'next/image';
// xs:w-[100vw] sm:w-[100vw] max-w-full md:w-[92vw] lg:w-[94vw] xl:w-[73vw]  z-0 flex  flex-grow flex-shrink
export default function FullVideoCard({video}) {

  const PosterImage = () => {
    return (
      <Image
        src={`${IPFS_GATEWAY}${video?.postById?.image}`}
        layout="fill"
        objectFit="cover"
        priority
       // placeholder="blur"
        alt='video cover'
      />
    );
  };
  return (
    <div className='flex w-[96vw] md:w-[95vw] lg:w-[94vw] xl:w-[73vw] border-t-0 z-0  rounded-xl  border border-fuchsia-900/50 justify-center cursor-pointer self-center'>
  

              {/*<Player 
      src={`${IPFS_GATEWAY_TWO}${video?.postById?.body}`   }
      poster={`${IPFS_GATEWAY}${video?.postById?.image}`}
      fluid={true} 
      preload="metadata" 
     
      >
      <BigPlayButton position="center" className="bg-red-700" />
      <LoadingSpinner  />
      <ControlBar autoHide={true} className="w-32 bg-red-700 text-violet-400 px-4 h-[200px]" />
      
  </Player>*/}
        <Player
      title="Waterfalls"
      playbackId={video?.postById?.body}
      loop
      autoPlay
      showTitle={false}
      
      poster={<PosterImage />}
    />
    </div>
  )
}
