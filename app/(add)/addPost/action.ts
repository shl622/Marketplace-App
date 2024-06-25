"use server"

import db from "@/lib/db"
import getSession from "@/lib/session"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const postSchema = z.object({
    title: z.string({
        required_error: "Title is required"
    }),
    description: z.string({
        required_error: "Description is required"
    }),
})

export async function uploadPost(_:any,formData:FormData){
    const data = {
        title: formData.get("title"),
        description: formData.get("description")
    }
    const result = postSchema.safeParse(data)
    if (!result.success){
        return result.error.flatten()
    }
    else {
        const session = await getSession()
        if (session.id){
            const post = await db.post.create({
                select:{
                    id:true
                },
                data:{
                    title: result.data.title,
                    description: result.data.description,
                    user:{
                        connect:{
                            id:session.id
                        }
                    }
                }
            })
            revalidatePath("/posts")
            revalidateTag("/post-detail")
            redirect(`/posts/${post.id}`)
        }

    }
}

