"use server"

import db from "@/lib/db"
import getSession from "@/lib/session"
import { revalidateTag } from "next/cache"

export async function likePost(postId: number) {
    //for optimistic testing, force a slow response
    // await new Promise((r)=>setTimeout(r,1000))
    const session = await getSession()
    try {
        await db.like.create({
            data: {
                postId: postId,
                userId: session.id!,
            }
        })
        revalidateTag(`like-status-${postId}`)
    } catch (e) {
        console.log(e)
    }
}

export async function dislikePost(postId: number) {
    //for optimistic testing, force a slow response
    // await new Promise((r)=>setTimeout(r,1000))
    try {
        const session = await getSession()
        await db.like.delete({
            where: {
                id: {
                    postId: postId,
                    userId: session.id!,
                }
            }
        })
        revalidateTag(`like-status-${postId}`)
    } catch (e) {
        console.log(e)
    }
}