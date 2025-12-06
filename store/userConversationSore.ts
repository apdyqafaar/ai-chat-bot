import axios from "axios";
import {create}from "zustand"
type Conversation={
 id: string;
    title: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
} | null

type ConversationSore={
    conversation:Conversation|null,
    loading:boolean,
    fetchUserConversation:(conver_id:string, user_id:string)=>void,
    clearConversation:()=>void,
}

export const userConversationStore=create<ConversationSore>((set)=>({
  conversation:null,
  loading:false,
  fetchUserConversation:async(conver_id,user_id)=>{
    try {
         set({loading:true})
         const {data}=await axios.post("/api/userConversation",{
          user_id,
          conver_id
         })
       set({conversation:data})

    } catch (error) {
        console.log("error from storing the user conversation: ", error)
    }finally{
      set({loading:false})
    }
  },

  clearConversation:()=>{
    set({conversation:null})
  }

}))