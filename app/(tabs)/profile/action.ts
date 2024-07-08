"use server";

import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export const logOut = async () =>{
    const session = await getSession()
    await session.destroy();
    redirect("/")
}

//testing purposes for session
export async function getUser() {
    const session = await getSession()
    if (session.id) {
        const user = await db.user.findUnique({
            where: {
                id: session.id
            }
        })
        if (user) {
            return user
        }
    }
    //if user DNE or no cookie return 404
    notFound()
}

export async function getUserProducts(id: number) {
    const products = await db.product.findMany({
        where: {
            userID: id
        },
        orderBy: {
            created_at: "desc"
        }
    })
    // console.log(products)
    if (products) {
        return products
    }
}

export async function getUserComments(id: number) {
    const comments = await db.comment.findMany({
        where: {
            userId: id
        },
        orderBy: {
            created_at: "desc"
        }
    })
    if (comments) {
        return comments
    }
}

export async function getUserPosts(id:number){
    const posts = await db.post.findMany({
        where:{
            userId: id
        },
        orderBy:{
            created_at:"desc"
        }
    })
    if (posts){
        return posts
    }
}
