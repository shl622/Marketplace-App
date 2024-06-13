import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code")
    if (!code) {
        return notFound()
    }
    const accessTokenParams = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
    }).toString()
    const accessTokenUrl = `https://github.com/login/oauth/access_token?${accessTokenParams}`
    
    //send POST request
    const accessTokenResponse = await fetch(accessTokenUrl,{
        method: "POST",
        headers: {
            Accept: "application/json"
        }
    })
    const accessTokenData = await accessTokenResponse.json()
    if ("error" in accessTokenData){
        return new Response(null,{
            status:400
        })
    }
    return Response.json({accessTokenData})
}