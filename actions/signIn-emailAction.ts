"use server"

import { auth } from "@/lib/auth"
import { APIError } from "better-auth"

import { headers } from "next/headers"

export const signInEmailAction=async({ email, password}:{email:string, password:string})=>{
    // console.log(password)
    
   

     if(!email) return{error:"Email is required"}

     if(!password) return{error:"Password is required"}

     const headersList=await headers()


     try {

        await auth.api.signInEmail({
            headers:headersList,
            body:{
                email,
                password,
            }
        })
        

        return {error:null}
     } catch (err) {
        console.log(err)
        if(err instanceof APIError){
            return {error:err.message}
        }
        if(err instanceof Error){
            return {error:"Connection was lost, Please try again"}
        }
        return{error:"Internal server error"}
     }
}