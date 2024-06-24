"use server"

import db from "@/lib/db"
import getSession from "@/lib/session"
import { revalidatePath, revalidateTag } from "next/cache"
import { z } from "zod"

const commentSchema = z.object({
    payload: z.string({
        required_error:"Please write a comment"
    })
})

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

export async function uploadComment(_:any,formdata:FormData,postId:number){
    const data = {
        payload: formdata.get("comment")
    }
    const result = commentSchema.safeParse(data)
    if(!result.success){
        return result.error.flatten()
    }
    else{
        const session = await getSession()
        if (session){
            console.log("id number of post", postId)
            const comment = await db.comment.create({
                select:{
                    id:true
                },
                data:{
                    payload:result.data.payload,
                    user:{
                        connect:{
                            id: session.id
                        }
                    },
                    post:{
                        connect:{
                            id: postId
                        }
                    }
                }
            })
        }
        revalidatePath("/posts")
    }
}