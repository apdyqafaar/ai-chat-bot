"use server"

import { auth } from "@/lib/auth"
import { ApiError } from "next/dist/server/api-utils"
import { headers } from "next/headers"

export const signUpEmailAction=async({name, email, password}:{name:string, email:string, password:string})=>{
    // console.log(password)
    
     if(!name) return{error:"Please enter the name"}

     if(!email) return{error:"Email is required"}

     if(!password) return{error:"Password is required"}

     const headersList=await headers()


     try {

        await auth.api.signUpEmail({
            headers:headersList,
            body:{
                email,
                password,
                name
            }
        })
        

        return {error:null}
     } catch (err) {
        console.log(err)
        if(err instanceof ApiError){
            return {error:err.message}
        }
        if(err instanceof Error){
            return {error:"Connection was lost, Please try again"}
        }
        return{error:"Internal server error"}
     }
}