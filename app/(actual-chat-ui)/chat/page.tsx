"use server"

import { auth } from "@/lib/auth"
import { Loader } from "lucide-react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const page = async() => {

  const session=await auth.api.getSession({
    headers:await headers()
  })

  if(!session){
    return redirect("/auth/signin")
  }else{
    return redirect("/chat/99")
  }
  return (
    <div className="min-h-screen min-w-full flex items-center justify-center">
      <Loader className=" animate-spin"/>
    </div>
  )
}

export default page