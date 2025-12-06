"use client";

import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
interface Conversation {
  id: string;
  title: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {  Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {  deleteConversationHelper, getAllConversations, refreshChats } from "@/helpers/conversation";
import { SessionWithUser } from "@/types/session";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Conversation{
     id: string;
    title: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export const SingleLinkConversation = ({
  conve,
  currentConversation,
  conversationLists,
  setCurrentConversation,
  setConversationLists,
  session
}: {
  conve: Conversation;
  currentConversation: string;
  session:SessionWithUser,
  conversationLists:Conversation[]
  setCurrentConversation: React.Dispatch<React.SetStateAction<string>>,
  setConversationLists:React.Dispatch<React.SetStateAction<Conversation[]>>
}) => {
   const [isOPen, setIsOpen]=useState(false)
   const [ispending, setIspending]=useState(false)
  const router = useRouter();
  const pathname=usePathname()
  const id=pathname.split("/").pop() as string


  useEffect(()=>{
    if(!currentConversation){
 setCurrentConversation(id)
    }
  },[])

  const handleCLick = () => {
    setCurrentConversation(conve.id);
    router.push(`/chat/${conve.id}`);
  };

  // hanlde delete
  const handleDeleteConversation=async()=>{
    setIspending(true)
     try {
       const res=await deleteConversationHelper({user_id:session.user.id, conver_id:conve.id})

       if(res===null){
        return toast.error("Failed to delete conversation",{position:"top-center"})
       }
       const conversations=await getAllConversations(session?.user?.id)
       setCurrentConversation("")
       setConversationLists((prev)=> prev.filter(c=>c.id !== conve.id))
       
        setCurrentConversation(conversations[0].id)
        router.push(`/chat/${conversations[0].id}`)
        // refreshChats()
        
        if(conversationLists.length===1){
          setTimeout(()=>{
             refreshChats()
          },4000)
           
        }

     } catch (error) {
      toast.error("Failed to delete conversation",{position:"top-center"})
      console.error(error)
     }finally{
      setIspending(false)
     }
  }
  return (
    <div className=" relative">
 <Button
      onClick={handleCLick}
      variant={"ghost"}
      className={`  my-1 hover:decoration-0 p-2 rounded-2xl  hover:bg-accent  flex justify-between w-full transition-all duration-200 ${
        currentConversation === conve.id && "bg-accent"
      }`}
    >
      <span className=" truncate pr-6 text-xs font-normal">{conve.title}{" "}</span>
   
       

    </Button>
      <span className=" absolute right-[5px] top-[7px]">

         <Popover >
          <PopoverTrigger className=" gap-2 cursor-pointer px-2 py-0 rounded-full"><span className="">...</span></PopoverTrigger>
          <PopoverContent onClick={()=> setIsOpen(!isOPen)} className="p-3 w-auto"><Trash2 className="w-4 text-destructive"/></PopoverContent>
        </Popover>
      </span>

      <AlertDialog onOpenChange={setIsOpen} open={isOPen}>
  <AlertDialogContent>
    <AlertDialogHeader>
     <AlertDialogTitle>Delete this chat?</AlertDialogTitle>
<AlertDialogDescription>
  This chat and its messages will be permanently removed. 
  This action cannot be undone.
</AlertDialogDescription>

    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
      <Button onClick={handleDeleteConversation} variant={"destructive"}>{ispending?<Loader2 className="animate-spin"/>:"Delete"}</Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </div>
   
  );
};
