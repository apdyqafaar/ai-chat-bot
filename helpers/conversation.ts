"use server";

import {
  createCOnversation,
  deleteCOnversation,
  getCOnversationById,
  getUserConversations,
  updateConversation,
} from "@/lib/chat";

import { revalidatePath } from "next/cache";

export const createNeChat = async (user_id: string) => {
  const conve = await createCOnversation(user_id);
  return conve;
};

export const deleteConversationHelper = async ({
  user_id,
  conver_id,
}: {
  user_id: string;
  conver_id: string;
}) => {
  const deletedConversation = await deleteCOnversation({ conver_id, user_id });
  
  return deletedConversation;
};



export const getAllConversations= async(user_id:string)=>{
  try {
    const conversations=await getUserConversations(user_id)
    return conversations
  } catch (error) {
    console.log('error from get realtime comnversation at helpers file: ', error)
    throw error
  }
}
export const chekConversatio=async(user_id:string,conver_id:string)=>{
 
  try {
          const conver=await getCOnversationById({conver_id,user_id, })
          console.log("checked: ",conver)

          if(!conver) return revalidatePath("/chat")
        } catch (error) {
          console.log("Error at checking if conversation exists: ", error)
        }
}


export async function refreshChats() {
  revalidatePath("/chat"); // or whatever path
}

