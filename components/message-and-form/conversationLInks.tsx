"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserConversations } from "@/lib/chat";
import SideparListClient from "./sideparListClient";

const ConversationLInks = async () => {
  // const {id}=await params
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <span className="text-red-600">Unauthorized</span>;
  }

  const conversations = await getUserConversations(session.user.id);
  return (
    <SideparListClient conversations={conversations} session={session}/>
  );
};

export default ConversationLInks;
