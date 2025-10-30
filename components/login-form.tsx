"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { signInEmailAction } from "@/actions/signIn-emailAction"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader } from "lucide-react"
import SignInSocioalButton from "./singIn-social-button"
type Inputs = {
  email: string
  password: string
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
   // states
  const [isPending, setIspending]=useState(false)
  const router=useRouter()

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async({ email, password}) => {
  setIspending(true)
    const {error}=await signInEmailAction({email, password})  

    if(error){
      setIspending(false)
      toast.error(error,{position:"top-center"})
    }else{
      setIspending(false)
      toast.success("You have logged successfully",{position:"top-center"})
      router.push("/")
    }

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
           <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-sm text-red-600">
              {errors.email.message}
            </span>
          )}
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="text-sm text-red-600">
              {errors.password.message}
            </span>
          )}
        </Field>

        <Field>
          <Button type="submit" className="cursor-pointer">
            {isPending?<Loader className="animate-spin"/> :"Login"}
          </Button>
         <SignInSocioalButton label="Login" provider="google"/>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link className="text-primary" href="/auth/signup">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  
        </CardContent>
      </Card>
    </div>
  )
}
