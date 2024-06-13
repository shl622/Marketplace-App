import db from "@/lib/db";
import { verifySession } from "@/lib/userAuth/verifySession";
import { notFound, redirect } from "next/navigation";
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
    const accessTokenResponse = await fetch(accessTokenUrl, {
        method: "POST",
        headers: {
            Accept: "application/json"
        }
    })
    const { error, access_token } = await accessTokenResponse.json()
    if (error) {
        return new Response(null, {
            status: 400
        })
    }
   
    //authorize via GH
    const userProfileResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${access_token}`
        },
        cache: "no-cache"
    })
    //poll data from the API: avatar,username and id
    const { id, login, avatar_url,email} = await userProfileResponse.json()
    const user = await db.user.findUnique({
        where: {
            github_id: id + ""
        },
        select: {
            id: true
        }
    })
    //if already signed in via GH:
    if (user) {
        await verifySession(user.id)
        return redirect("/profile")
    }
    //if new user:
    const newUser = await db.user.create({
        data: {
            username: `${login}-gh`,
            github_id: id + "",
            avatar: avatar_url,
            email: email
        },
        select: {
            id: true
        }
    })
    await verifySession(newUser.id)
    return redirect("/profile")
}