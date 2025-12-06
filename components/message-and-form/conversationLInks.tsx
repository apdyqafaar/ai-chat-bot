"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserConversations } from "@/lib/chat";
import SideparListClient from "./sideparListClient";

interface ConversationInterface{
  id: string;
    title: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

const ConversationLInks = async () => {
  

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <span className="text-red-600">Unauthorized</span>;
  }
   let conversations:ConversationInterface[]=[]
  const loadConversations=async()=>{
  conversations=await getUserConversations(session.user.id);
   
  }
   await loadConversations()

  
  return (
    <SideparListClient conversations={conversations} session={session}/>
  );
};

export default ConversationLInks;
