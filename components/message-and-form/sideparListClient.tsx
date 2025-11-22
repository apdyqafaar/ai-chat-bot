"use client"

import { SidebarContent, SidebarGroup } from "../ui/sidebar"
import CreateNewChatButtton from "./createNewChatButtton"
import { SessionWithUser } from "@/types/session"
import { useEffect, useState } from "react"
import { SingleLinkConversation } from "./singleLinkConversation"

interface Conversation{
     id: string;
    title: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
interface pageProb{
    conversations:Conversation[],
   session:SessionWithUser,
  //  currentChatId:string
}

const SideparListClient = ({session, conversations}:pageProb) => {
    const [conversationLists, setConversationLists]=useState<Conversation[]>()
  const [currentConversation, setCurrentConversation] = useState("");
 


 useEffect(()=>{
  setConversationLists(conversations)
  setCurrentConversation(conversations[0].id)
 },[])
    
  return (
    <SidebarContent>
        <SidebarGroup>
       
         <CreateNewChatButtton setCurrentConversation={setCurrentConversation} session={session} setConversationLists={setConversationLists as any} />
   
        </SidebarGroup>
      <SidebarGroup>
        <span className="text-xs text-muted-foreground pl-2">chats</span>
        {conversationLists?.map((con) => (
          <SingleLinkConversation session={session} key={con.id} conve={con} currentConversation={currentConversation} setCurrentConversation={setCurrentConversation} setConversationLists={setConversationLists as any}/>
        ))}
      </SidebarGroup>
    </SidebarContent>
  )
}

export default SideparListClient