import { auth } from "@/lib/auth"
import { loadMessages, saveChat } from "@/lib/chat";
import { headers } from "next/headers"
import {convertToModelMessages, createIdGenerator, streamText, UIMessage, validateUIMessages} from "ai"
import { openai } from "@ai-sdk/openai"
import { revalidatePath } from "next/cache";


export const runtime = 'nodejs'; // or 'edge' but test both
export const maxDuration = 30;


export async function POST(req:Request) {
    try {
        const session=await auth.api.getSession({
            headers:await headers()
        })

        if(!session) return Response.json({error:"Internal api route rrror"},{status:500})
        
         let body=await req.json()
         const {messages, message:single_message, id:conversa_id}=body
        if(!conversa_id) return Response.json({error:"Conversation id is required"},{status:400})

            // console.log("single_message",single_message)

        
        let allMessages:UIMessage[]

        if(single_message){
            const previosMessages=await loadMessages(conversa_id)
            allMessages=[...previosMessages, single_message]
        }else if(messages){
            allMessages=[...messages, single_message]
        }else{
            return Response.json({error:"Internal api route rrror"},{status:500})
        }
   
       let validatedMessages: UIMessage[];

      try {
        validatedMessages=await validateUIMessages({
            messages:allMessages
        })
      } catch (err) {
           console.error(err)
        return Response.json({error:"Failed to validate messages"},{status:500})
      }

     const result= streamText({
        model:openai("gpt-4.1"),
        prompt:convertToModelMessages(validatedMessages)
     })

     result.consumeStream()
     return result.toUIMessageStreamResponse({
        originalMessages:validatedMessages,
        generateMessageId:createIdGenerator({
            prefix:"msg_",
            size:16
        }),
        onFinish:async({messages}:{messages:any})=>{
            if(allMessages.length<3){
                revalidatePath("/chat")
            }

             try {
               await saveChat({conver_id:conversa_id, messages}) 
             } catch (err) {
             console.error("saving the message after streeming ",err)
             }
        }
     })

    } catch (err) {
        console.error(err)
        return Response.json({error:"Internal api route rrror"},{status:500})
    }
}