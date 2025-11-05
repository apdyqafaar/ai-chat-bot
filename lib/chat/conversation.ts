import { db } from "@/db/drizzle"
import { conversation } from "@/db/schema"
import { and, asc, desc, eq } from "drizzle-orm"
import {nanoid} from"nanoid"


// createing conversation
export const createCOnversation=async(user_id:string, title?:string)=>{
     const con_id=nanoid()
    const [result]=await db.insert(conversation).values({
        title:title || "New converation",
        userId:user_id,
        id:con_id
    })
    .returning()

    return result
}


// geing user conversations
export const getUserConversations=async(user_id:string)=>{
    return await db.select()
    .from(conversation)
    .where(eq(conversation.userId,user_id))
    .orderBy(desc(conversation.updatedAt))
}

//get spacific conversation by id

export const getCOnversationById=async({conver_id, user_id}:{conver_id:string, user_id:string})=>{
  const result=await db.select()
  .from(conversation)
  .where(and(eq(conversation.id,conver_id), eq(conversation.userId, user_id))) 
  
  const conve=result[0]
  if(!conve ||conve.userId !== user_id)return null

  return conve
}



// delete conversation
export const deleteCOnversation=async({conver_id, user_id}:{conver_id:string, user_id:string})=>{
   const result=await db.delete(conversation)
   .where(and(eq(conversation.id, conver_id), eq(conversation.userId, user_id)))
   .returning()


   if(result.length ===0)return null

   return result
}