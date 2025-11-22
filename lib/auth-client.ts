import { createAuthClient } from "better-auth/react"
export const {signIn, signUp, signOut, useSession, } = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "https://ai-chat-bot-lovat.vercel.app"
})

// export const { signIn, signUp, useSession } = createAuthClient()