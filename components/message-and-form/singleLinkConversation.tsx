"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
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
import { Dot, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteConversationHelper } from "@/helpers/conversation";
import { SessionWithUser } from "@/types/session";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
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
  setCurrentConversation,
  setConversationLists,
  session
}: {
  conve: Conversation;
  currentConversation: string;
  session:SessionWithUser,
  setCurrentConversation: React.Dispatch<React.SetStateAction<string>>,
  setConversationLists:React.Dispatch<React.SetStateAction<Conversation[]>>
}) => {
   const [isOPen, setIsOpen]=useState(false)
   const [ispending, setIspending]=useState(false)
  const router = useRouter();


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

       setConversationLists((prev)=> prev.filter(c=>c.id !== conve.id))

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
      className={` my-1 hover:decoration-0 p-2 rounded-2xl text-sm hover:bg-accent  flex justify-between w-full transition-all duration-200 ${
        currentConversation === conve.id && "bg-accent"
      }`}
    >
      {conve.title}{" "}
   
       

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
