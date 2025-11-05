"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";

type FormUIPro={
  sendMessage:({text}:{text:string})=> void,
  resumeStream:()=> void,
  stop:()=>void
  status:"streaming" |"error" | "ready" |"submitted",
}

const FormUi = ({sendMessage, resumeStream, status, stop}:FormUIPro) => {

  const [input, setInput]=useState<string>("")
  const handleForm=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(status==="ready"){
      sendMessage({text:input.trim()})
      setInput("")
    }else {
      stop()
    }

  }
  return (
    <div className="pb-10 bg-background">
      <div className="max-w-3xl mx-auto w-full">
        <form className="w-full" onSubmit={handleForm}>
          <div className="flex items-end relative w-full mt-2 rounded-lg border border-border gap-2 sm:-ml-2 bg-foreground/5">
            <TextareaAutosize
            value={input}
            onChange={(e)=>setInput(e.target.value)}
              minRows={1}
              maxRows={6}
              placeholder="Ask anything..."
              className="w-full resize-none bg-transparent text-base px-4 py-4 pr-24  focus:outline-none focus-visible:ring-0"
            />
          {
            status==="ready"?(
          <Button
            disabled={!input}
              type="submit"
              className={`${status==="ready"?"rounded-full":"rounded-lg "} absolute right-3 bottom-2 h-10 px-4 cursor-pointer`}
            >
        
                 <ArrowUp/>
           
            </Button>
            ):(

              
               <Button
              type="submit"
              className={`rounded-lg absolute right-3 bottom-2 h-10 px-4 cursor-pointer`}
            >
           
                <div className="w-5 h-5 rounded bg-gray-300"></div>
            
            </Button>
          
               
            )
          }
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormUi;
