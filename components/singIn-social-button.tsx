"use client";

import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

const SignInSocioalButton = ({
  provider,
  label,
}: {
  provider: string;
  label: string;
}) => {
  const [isPending, setIsPending] = useState(false);

  const handleSignIn = async () => {
    
      await signIn.social({
        provider,
        callbackURL:"/",
        fetchOptions:{
            onRequest:()=>setIsPending(true),
            onResponse:()=>setIsPending(false),
            onError(context) {
                setIsPending(false);
                console.log(context.error)
                toast.error(context.error.message,{position:"top-center"})
            },
        }
      });
  };

  return(
     <Button onClick={handleSignIn} variant="outline" type="button" className="cursor-pointer">
           {isPending?<Loader className="animate-spin"/>:`${label} with  Google`}
        </Button>
  )
};

export default SignInSocioalButton;
