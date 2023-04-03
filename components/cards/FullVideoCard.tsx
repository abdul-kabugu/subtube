// @ts-nocheck

import { IPFS_GATEWAY, IPFS_GATEWAY_TWO } from '@/assets/constant';
import React from 'react'
import { Player, BigPlayButton,  LoadingSpinner , ControlBar} from 'video-react';
import 'video-react/dist/video-react.css';

export default function FullVideoCard({video}) {
  return (
    <div className='xs:w-[100vw]  md:w-[80vw] lg:w-[90vw] xl:w-[70vw]  z-0 flex  flex-grow flex-shrink'>

              <Player 
      src={`${IPFS_GATEWAY_TWO}${video?.postById?.body}`   }
      poster={`${IPFS_GATEWAY}${video?.postById?.image}`}
      fluid={true} 
      preload="metadata" 
      >
      <BigPlayButton position="center" className="bg-red-700" />
      <LoadingSpinner  />
      <ControlBar autoHide={true} className="w-32 bg-red-700 text-violet-400 px-4 h-[200px]" />
      
     </Player>
     
    </div>
  )
}
