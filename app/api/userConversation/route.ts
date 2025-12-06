import { auth } from "@/lib/auth";
import { getCOnversationById } from "@/lib/chat";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
       
        const session=await auth.api.getSession({
            headers:await headers()
        })

        if(!session) {
            return NextResponse.json(null, {status:401})
        }

        const { conver_id}=await req.json()
        // console.log("conver_id", conver_id)

         if(!conver_id ) {
            return NextResponse.json(null, {status:401})
        }

        const conversationUpdated=await getCOnversationById({conver_id, user_id:session?.user?.id})
        return NextResponse.json(conversationUpdated, {status:200})

    } catch (error) {
     console.error("Error at userconversaion route: ",error);
    return NextResponse.json({ error: "Server error" }, { status: 500 }); 
    }
}