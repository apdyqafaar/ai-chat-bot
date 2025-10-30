"use client"

import { signUpEmailAction } from "@/actions/signUp-emailActions"
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
import { Loader } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import SignInSocioalButton from "./singIn-social-button"

type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  // states
  const [isPending, setIspending]=useState(false)
  const router=useRouter()

    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async({name, email, password}) => {
  setIspending(true)
    const {error}=await signUpEmailAction({email, password, name})  

    if(error){
      setIspending(false)
      toast.error(error,{position:"top-center"})
    }else{
      setIspending(false)
      toast.success("You have been registered successfully",{position:"top-center"})
      router.push("/auth/signin")
    }

  }

  const password = watch("password");

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name", { required: "Full name is required" })}
          />
          {errors.name && <span className="text-sm text-red-600">{errors.name.message}</span>}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
          
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email ? <span className="text-sm text-red-600">{errors.email.message}
            </span>: <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
            }
          
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Must be at least 8 characters" },
            })}
          />
          {
          errors.password && <span className="text-sm text-red-600">{errors.password.message}
          </span>
          
          }
         
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
           {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && <span className="text-sm text-red-600">{errors.confirmPassword.message}
            
            </span>
            
            }
         
        </Field>

        <FieldGroup>
          <Field>
            <Button type="submit" className="cursor-pointer">{isPending?<Loader className="animate-spin"/> :"Create Account"}</Button>
         <SignInSocioalButton label="Sign Up" provider="google"/>
            <FieldDescription className="px-6 text-center">
              Already have an account? <Link className="text-primary" href="/auth/signin">Sign in</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
      </CardContent>
    </Card>
  )
}
