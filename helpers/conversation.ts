"use server"

import { createCOnversation, deleteCOnversation } from "@/lib/chat"

export const createNeChat=async(user_id:string)=>{
   const conve=await createCOnversation(user_id)
   return conve
}

export const deleteConversationHelper=async({user_id, conver_id}:{user_id:string, conver_id:string})=>{
   const deletedConversation=await deleteCOnversation({conver_id, user_id})
   return deletedConversation
}