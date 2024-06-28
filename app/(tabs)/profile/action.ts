"use server";

import getSession from "@/lib/session";
import { redirect } from "next/navigation";


export const logOut = async () =>{
    const session = await getSession()
    await session.destroy();
    redirect("/")
}