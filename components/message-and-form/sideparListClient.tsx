"use client"

import { SidebarContent, SidebarGroup } from "../ui/sidebar"
import CreateNewChatButtton from "./createNewChatButtton"
import { SessionWithUser } from "@/types/session"
import { useEffect, useState } from "react"
import { SingleLinkConversation } from "./singleLinkConversation"
import { userConversationStore } from "@/store/userConversationSore"

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


const SideparListClient = ({session, conversations,}:pageProb) => {
    const [conversationLists, setConversationLists]=useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState("");
  const{ conversation, clearConversation}=userConversationStore()
// useEffect(() => {
//   if (!session?.user?.id) return;

//   const intervalId = setInterval(async () => {
//     try {
//       const convers = await getAllConversationsRealTimeConnection(session.user.id);
//       console.log(convers);
//     } catch (error) {
//       console.log("error fetching:", error);
//     }
//   }, 6000); // every 4 sec

//   return () => clearInterval(intervalId);
// }, [session?.user?.id]);


  
 


 useEffect(()=>{
  setConversationLists(conversations)
  

 },[conversations])

useEffect(()=>{
   if(conversation!==null && conversationLists?.length>0){
  setConversationLists(preve=>preve.map(conve=> (conve.id===conversation.id && conve.title!== conversation.title)?
  {...conve, title:conversation.title}
  :conve
))

clearConversation()
}
},[conversation])
    
  return (
    <SidebarContent>
        <SidebarGroup>
       
         <CreateNewChatButtton setCurrentConversation={setCurrentConversation} session={session} setConversationLists={setConversationLists as any} />
   
        </SidebarGroup>
      <SidebarGroup>
        <span className="text-xs text-muted-foreground pl-2">chats</span>
        {conversationLists?.map((con) => (
          <SingleLinkConversation conversationLists={conversationLists} session={session} key={con.id} conve={con} currentConversation={currentConversation} setCurrentConversation={setCurrentConversation} setConversationLists={setConversationLists as any}/>
        ))}
      </SidebarGroup>
    </SidebarContent>
  )
}

export default SideparListClient