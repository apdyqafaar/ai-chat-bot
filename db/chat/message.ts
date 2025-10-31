// import {UIMessage} from "ai"
import { db } from "../drizzle"
import { conversation, message } from "../schema"
import { asc, eq } from "drizzle-orm"

type UIMessage = {
  id: string;
  role: "user" | "assistant";
  parts: { type: "text" | "image"; text?: string; imageUrl?: string }[];
};


// save chat

export const saveChat=async({conver_id, messages}:{conver_id:string, messages:UIMessage[]})=>{

    // get conversation first
    const conv=await db.select()
    .from(conversation)
    .where(eq(conversation.id, conver_id))
    .limit(1)


    if(conv.length ===0) throw new Error("Conversation not Found")


    const exisitingMessages=await db.select()
    .from(message)
    .where(eq(message.id, conver_id))


    const exisitingMessagesIds=exisitingMessages.map((m)=> m.id)
    // filtering to get the new messages and remove old ones which are in the database
    const newMessages= messages.filter((m)=> !exisitingMessagesIds.includes(m.id))
    



    if(newMessages.length>0){

        // transforming to databse data
        const dbMessages=newMessages.map((msg=>{
            const textPart=msg.parts.find(p=>p.type==="text")
            const imagePart=msg.parts.find(p=>p.type==="image")
            const content=textPart?.text || ""
            const imageUrl=imagePart?.imageUrl || ""

            return{
                id:msg.id,
                content,
                imageUrl,
                userId:conv[0].userId,
                conversationId:conver_id,
                role:msg.role
            }
        }))


        await db.insert(message).values(dbMessages)

        await db.update(conversation)
        .set({updatedAt:new Date()})
    }
}

























// load messages
export async function loadMessages(conversationId: string): Promise<UIMessage[]> {
  const messages = await db
    .select()
    .from(message)
    .where(eq(message.conversationId, conversationId))
    .orderBy(asc(message.createdAt));

  return messages.map((m) => {
    const parts = [];

    if (m.content) {
      parts.push({ type: "text" as const, text: m.content });
    }

    if (m.imageUrl) {
      parts.push({ type: "image" as const, imageUrl: m.imageUrl });
    }

    return {
      id: m.id,
      role: m.role as "user" | "assistant",
      parts,
    };
  });
}