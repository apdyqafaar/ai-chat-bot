import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";


const ProtectedRoutes=["/chat"]

export async function proxy(request: NextRequest) {
    const {nextUrl}=request
	const sessionCookie = getSessionCookie(request);
    const res=NextResponse.next()

    const isLogged= !!sessionCookie;
    const isOnprotectedRpute=ProtectedRoutes.includes(nextUrl.pathname)
    const isAuthRoute=nextUrl.pathname.startsWith("/auth")
    
    if(isOnprotectedRpute && !isLogged){
      return NextResponse.redirect(new URL("/auth/signin", request.url))
    }

    if(isAuthRoute && isLogged){
      return NextResponse.redirect(new URL("/", request.url))
    }
    return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
