"use server"
import { loadMessages } from "@/lib/chat"
import MessageandFormUi from "./MessageandFormUi"
import { SessionWithUser } from "@/types/session"

const LayoutMessageAndForm = async({conversat_id, session, }:{conversat_id:string, session:SessionWithUser}) => {
  // search the conversation

    const initialMessages=await loadMessages(conversat_id)
  return (
    <MessageandFormUi initialMessages={initialMessages as any} conversat_id={conversat_id} session={session}/>
  )
}

export default LayoutMessageAndForm