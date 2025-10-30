import React from 'react'
import Messages from './Messages'
import FormUi from './form'

const MessageandFormUi = () => {
  return (
    <div className="min-w-full flex flex-col  px-4 min-h-full relative ">
        {/* messsages */}
      <div className="flex-1  overflow-y-auto w-full">
       
            <Messages/>
    
      </div>

      {/* form */}
      <div className=' sticky bottom-0 left-0 right-0'>
        <FormUi/>
      </div>
    </div>
  )
}

export default MessageandFormUi