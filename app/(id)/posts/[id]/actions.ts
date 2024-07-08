"use server"

import db from "@/lib/db"
import getSession from "@/lib/session"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const commentSchema = z.object({
    payload: z.string({
        required_error: "Please write a comment"
    }).min(1,"Please type comment")
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

export async function uploadComment(_: any, formdata: FormData, postId: number) {
    const data = {
        payload: formdata.get("comment")
    }
    const result = commentSchema.safeParse(data)
    if (!result.success) {
        return result.error.flatten()
    }
    else {
        const session = await getSession()
        if (session) {
            console.log("id number of post", postId)
            const comment = await db.comment.create({
                select: {
                    id: true
                },
                data: {
                    payload: result.data.payload,
                    user: {
                        connect: {
                            id: session.id
                        }
                    },
                    post: {
                        connect: {
                            id: postId
                        }
                    }
                }
            })
        }
        revalidatePath("/posts")
    }
}

export async function deletePost(postId: number, userId: number) {
    await db.post.delete({
        where: {
            userId: userId,
            id: postId
        }
    })
    revalidatePath("/posts")
    redirect(`/posts`)
}


export async function getComments(postId: number) {
    const comments = await db.comment.findMany({
        where: {
            postId
        },
        select: {
            id: true,
            payload: true,
            created_at: true,
            user: {
                select: {
                    username: true,
                    avatar: true,
                    id: true
                }
            }
        },
        orderBy: {
            created_at: "desc"
        },
    })
    return comments
}

export async function deleteComment(commentId:number){
    await db.comment.delete({
        where:{
            id:commentId
        }
    })
    revalidatePath("/posts")
}