"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { signOut } from "@/lib/auth-client"
import { toast } from "sonner"
import { Loader, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

const SignOutBtn = () => {
    const [isPending, setIsPending]=useState(false)
    const router=useRouter()
    const handleLougOut=async()=>{
     await signOut({
        fetchOptions:{
             onSuccess: () => {
      router.push("/auth/signin"); 
    },
            onRequest:()=>setIsPending(true),
            onResponse:()=>setIsPending(false),
            onError(context) {
                setIsPending(false)
                toast.error(context.error.message,{position:"top-center"})
            },
        }
     })
    }
  return (
    <Button size={"sm"}onClick={handleLougOut}variant={"destructive"}>{isPending?<Loader className=" animate-spin text-xs"/> :
    <div className="flex items-center text-xs gap-2">
    <LogOut className="text-gray-50"/> Loug out
    </div>
    }</Button>
  )
}

export default SignOutBtn