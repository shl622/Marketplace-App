"use server"

import db from "@/lib/db";
import getSession from "@/lib/session";
import { unstable_cache as nextCache, revalidatePath, revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const postSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string({
        required_error: "Title is required"
    }),
    description: z.string({
        required_error: "Description is required"
    }),
})

export async function updatePost(_:any, formData: FormData){
    const session = await getSession()
    if (!session.id){
        return
    }
    const data = {
        id: formData.get("id"),
        title: formData.get("title"),
        description: formData.get("description")
    }
    const result = postSchema.safeParse(data)
    if (!result.success){
        return result.error.flatten()
    }
    else{
        const post = await db.post.update({
            where:{
                id: result.data.id
            },
            data:{
                title: result.data.title,
                description: result.data.description,
            }
        })
        revalidatePath("/posts")
        revalidatePath(`/posts/${post.id}`)
        revalidateTag("/post-detail")
        redirect(`/posts/${post.id}`)
    }
}

async function getPost(id:number){
    const post = await db.post.findUnique({
        where:{
            id
        }
    })
    return post
}

export default async function getOriginalPost(id: number) {
    const post = await getPost(id)
    if (!post) {
        return notFound()
    }
    else {
        return ({
            id: post.id,
            title: post.title,
            description: post.description
        })
    }
}