import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
    [key: string]: boolean
}

//obeject instead of array
//hash map structure
const publicUrls: Routes = {
    "/": true,
    "/login": true,
    "/sms": true,
    "/create-account": true,
    "/github/start": true,
    "/github/complete": true,
    "/guest":true,
}
//function name "middleware" and "config" should not be modified
//make sure middleware does not run in unwanted paths
export async function middleware(request: NextRequest) {
    const session = await getSession()
    const exists = publicUrls[request.nextUrl.pathname]
    //if cookie DNE in session (not logged in)
    if (!session.id) {
        //if the user's desired url DNE in middleware boundary
        if (!exists) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }
     // *** what if user is already logged in and wants to go to new user creation page? ***
    else{
        if(exists){
            return NextResponse.redirect(new URL("/profile",request.url))
        }
    }
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
}