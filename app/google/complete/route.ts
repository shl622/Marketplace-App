
import db from "@/lib/db";
import { verifySession } from "@/lib/userAuth/verifySession";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const code = await request.nextUrl.searchParams.get("code");

    if (!code) {
        return notFound();
    }
    const accessTokenParams = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.GOOGLE_REDIRECT_URL!,
    }).toString()

    const accessTokenURl = `https://oauth2.googleapis.com/token?${accessTokenParams}`

    const { error, access_token } = await (
        await fetch(accessTokenURl, {
            method: "POST",
            headers: {
                Accept: "application/json"
            }
        })
    ).json()
    console.log(access_token)

    if (error) {
        return new Response(null, {
            status: 400
        })
    }
    const userProfileResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            Authorization: `Bearer ${access_token}`,
            cache: "no-cache",
        }
    })
    const {id,name,avatar_url,email} = await userProfileResponse.json()

    const user = await db.user.findUnique({
        where:{
            google_id : id+ "",
        },
        select:{
            id:true
        }
    })
    if(user){
        await verifySession(user.id)
        return redirect("/profile")
    }
    const newUser = await db.user.create({
        data:{
            username: `${name}-gl`,
            google_id: id+"",
            avatar: avatar_url,
            email: email
        },
        select:{
            id:true
        }
    })
    await verifySession(newUser.id)
    return redirect("/profile")
}