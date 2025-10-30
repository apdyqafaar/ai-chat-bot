"use server"
import Header from "@/components/header/header"
import LayoutMessageAndForm from "@/components/message-and-form/layoutMe"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"

interface PageParams{
params:Promise<{id:string}>
}
const page = async({params}:{params:PageParams}) => {


    const session=await auth.api.getSession({
      headers:await headers()
    })
  
    if(!session){
      return redirect("/auth/signin")
    }
  return (
    <div className="flex  min-w-full flex-col  min-h-screen relative bg-background">
      {/* header */}
   <div className=" sticky top-0 left-0 right-0 z-10 bg-background">
       <Header/>
   </div>


      {/* main chat*/}
      <div className="flex-1">
        <Suspense>
          <LayoutMessageAndForm/>  
        </Suspense>
       
      </div>
     
     
    </div>
  )
}

export default page