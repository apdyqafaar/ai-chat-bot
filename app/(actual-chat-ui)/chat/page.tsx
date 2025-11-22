"use server"

import { auth } from "@/lib/auth"
import { createCOnversation, getUserConversations } from "@/lib/chat"
import { Loader } from "lucide-react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const page = async() => {

  const session=await auth.api.getSession({
    headers:await headers()
  })

  if(!session){
    return redirect("/auth/signin")
  }
  

  const conversations=await getUserConversations(session.user.id)
  const latestConversation=conversations[0]
  if(latestConversation){
    return redirect(`/chat/${latestConversation.id}`)
  }else{
    const newConversation_id=await createCOnversation(session.user.id)
     return redirect(`/chat/${newConversation_id}`)
  }

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center">
      <Loader className=" animate-spin"/>
    </div>
  )
}


export default page