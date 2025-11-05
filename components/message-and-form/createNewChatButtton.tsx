"use client"
import { Loader2, SquarePen } from "lucide-react"
import { Button } from "../ui/button"
import { toast } from "sonner"
import React, { useState } from "react"
import { SessionWithUser } from "@/types/session"
import { createCOnversation } from "@/lib/chat"
import { useRouter } from "next/navigation"
import { createNeChat } from "@/helpers/conversation"


interface Conversation{
     id: string;
    title: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

const CreateNewChatButtton = ({session, setConversationLists, setCurrentConversation}:{session:SessionWithUser, setConversationLists:React.Dispatch<React.SetStateAction<Conversation[]>>, setCurrentConversation:React.Dispatch<React.SetStateAction<string>> }) => {

    const [ispending, setIspending]=useState(false)
  

    const router=useRouter()

    const handleClick=async()=>{
        setIspending(true)
        try {
            const conve=await createNeChat(session.user.id)
            if(conve){
               
                router.push(`/chat/${conve.id}`)
              setConversationLists((pre)=> [conve,...pre])
              setCurrentConversation(() => conve.id)

               console.log("After setting - should be:", conve.id);
            } 
            
        } catch (error) {
            setIspending(false)
            console.error(error)
            toast.error("Failed to create new chat, try again", {position:"bottom-right"})
        }finally{
            setIspending(false)
        }
    }
  return (
<Button onClick={()=>handleClick()} variant={"outline"} className={`text-start flex ${ispending?"justify-center":"justify-start"} cursor-pointer`}>{
    ispending?(
    <Loader2 className="animate-spin"/>
    ):(
        <>
        {<SquarePen />} New chat
        </>
    )
    
    }</Button>
  )
}

export default CreateNewChatButtton