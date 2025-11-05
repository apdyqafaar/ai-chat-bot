"use client"

import { UIMessage } from "@/lib/chat";
import StartConversation from "./startConversation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SessionWithUser } from "@/types/session";
import { Bot, User } from "lucide-react";
import { Streamdown } from "streamdown";
import { useEffect, useRef } from "react";


interface MessagesProps {
  messages: UIMessage[];
  session:SessionWithUser,
   status:"streaming" |"error" | "ready" |"submitted",
}



const Messages = ({ messages, session, status }: MessagesProps) => {

const bottomRef = useRef<HTMLDivElement | null>(null);

  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  return (
   
       <div
     
       className=" min-h-full max-w-3xl mx-auto w-full py-10 scrolle--">
        {
          messages.length===0?(
            <StartConversation/>
          ):(
           messages.map((message)=>(
            <div key={message.id} className={`flex ${message.role==="user"?"justify-end":"justify-start"}`}>
              <div className={`flex space-x-2 max-w-2xl ${message.role==="user"&&"flex-row-reverse space-x-reverse"}`}>
              <Avatar className="h-9 w-9 shrink-0 flex">
              {
                message.role==="user"?(
                  <>
                    <AvatarImage src={session.user.name || " "}/>
                    <AvatarFallback className="bg-primary/70 w-full h-full text-sm ">
                    <User className="h-4 w-4 text-white"/>
                    </AvatarFallback>
                  </>
                ):(
                   <AvatarFallback className="bg-primary/70 w-full h-full text-sm ">
                    <Bot className="h-4 w-4 text-white"/>
                    </AvatarFallback>
                )
              }
              </Avatar>

              {/* content */}
              <div className={`px-3 py-2 rounded-2xl my-4 ${message.role==="user"?"bg-primary/70 text-white":""}`}>
                <div className="text-sm leading-relaxed font-normal">
                  {
                    message.parts.map((part,i)=>{
                      switch (part.type){
                        case "text":
                          return message.role ==="assistant"?(
                            <Streamdown isAnimating={status === "streaming"} key={i} >
                              {part.text}
                            </Streamdown>
                          ):(
                            <span key={i+Math.floor(Math.random()*2)}>{part.text}</span>
                          )
                      }
                    })
                  }
                </div>
              </div>
            
              </div>
              
            </div>
           ))
          )
        }
        <div ref={bottomRef} />
       </div>
         
  )
}

export default Messages