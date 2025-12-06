import { auth } from "@/lib/auth";
import { createCOnversation, getUserConversations } from "@/lib/chat";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
       
        const session=await auth.api.getSession({
            headers:await headers()
        })

        if(!session) {
              return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); 
        }

        const conversation=await getUserConversations(session?.user?.id)
        return NextResponse.json(conversation, {status:200})

    } catch (error) {
     console.error("Error at userconversaion route: ",error);
    return NextResponse.json({ error: "Server error" }, { status: 500 }); 
    }
}