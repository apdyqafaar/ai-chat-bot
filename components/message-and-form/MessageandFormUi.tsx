"use client"
import { DefaultChatTransport, UIMessage } from 'ai'
import Messages from './Messages'
import FormUi from './form'
import {useChat} from"@ai-sdk/react"
import { SessionWithUser } from '@/types/session'

interface chatProb{
  initialMessages:UIMessage[],
  conversat_id:string
  session:SessionWithUser
}

const MessageandFormUi = ({initialMessages=[], conversat_id, session}:chatProb) => {

  const {messages, sendMessage, status, stop,resumeStream}=useChat({
    id:conversat_id,
    messages:initialMessages,
    transport: new DefaultChatTransport({
      api:"/api/chat",
      prepareSendMessagesRequest({messages, id}){
        return{
          body:{
            message:messages[messages.length -1],
            id
          }
        }
      }
    })
  })

  return (
    <div className="min-w-full flex flex-col  px-4 min-h-full relative ">
        {/* messsages */}
      <div className="flex-1 h-screen mb-7 w-full">
       
            <Messages messages={messages as any} session={session} status={status}/>
    
      </div>

      {/* form */}
      <div className=' sticky bottom-0 left-0 right-0'>
        <FormUi sendMessage={sendMessage} stop={stop} status={status} resumeStream={resumeStream}/>
      </div>
    </div>
  )
}

export default MessageandFormUi