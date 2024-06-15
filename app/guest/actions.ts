"use server"

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface GuestSessionContent {
    id?: number
}

export async function guestLogin() {
    const guest = {
        id: 999999
    }
    const session = await getIronSession<GuestSessionContent>(cookies(), {
        cookieName: "guest-cookie",
        password: process.env.COOKIE_PW_GUEST!
    })
    if (session){
        session.id = guest.id
        await session.save()
    }
    redirect("/profile")
}