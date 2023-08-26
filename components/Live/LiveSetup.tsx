import {useState} from 'react'
import SetuInstructions from './SetuInstructions'
import StreamSetup from './StreamSetup'

export default function LiveSetup() {
  const [currentView, setcurrentView] = useState(0)
  const GetCurrentView = () => {
    if(currentView === 0){
      return(
        <SetuInstructions  />
      )
    }else if(currentView === 1){
      return(
        <StreamSetup  />
      )
    }
  }
    
  return (
    <div className='flex flex-col justify-center items-center'>
       <div className='  gap-9 flex items-center justify-center my-5'>
         <button className='bg-fuchsia-600 py-1.5 px-3 rounded-lg' onClick={() => setcurrentView(0)}> 📝Instructions</button>
         <button className='bg-fuchsia-600 py-1.5 px-3 rounded-lg' onClick={() => setcurrentView(1)}>🔴 Set up a new live stream</button>
       </div>
      {GetCurrentView()}
    </div>
  )
}
