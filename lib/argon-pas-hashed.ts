import {hash, verify, type Options}from "@node-rs/argon2"
const opts:Options={
    outputLen:32,
    memoryCost:19456,
    parallelism:1,
    timeCost:2
}

export const hashPassword=async(password:string)=>{
    const result=await hash(password,opts)
    return result
}

export const veriFayPassowd=async(data:{password:string, hash:string})=>{
   const {hash, password}=data
   const result=await verify(hash, password)
   return result
}