import { db } from "@/db/drizzle";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { hashPassword, veriFayPassowd } from "./argon-pas-hashed";
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", 
        schema,
    }),
    emailAndPassword:{
        enabled:true,
        autoSignIn:false,
        password:{
            hash:hashPassword,
            verify:veriFayPassowd
        }
    },
    socialProviders:{
         google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
            prompt:"select_account",
            accessType:"offline"
        }, 
    },
    plugins: [nextCookies()]
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN"