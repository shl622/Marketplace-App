"use server";

import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { getUploadUrl } from "@/app/(add)/addProduct/action";

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

export async function getUserLiveProducts(id: number) {
    const products = await db.product.findMany({
        where: {
            userID: id,
            status: true
        },
        orderBy: {
            created_at: "desc"
        },
        include:{
            _count:{
                select:{
                    loves:true
                }
            }
        }
    })
    // console.log(products)
    if (products) {
        return products
    }
}

export async function getUserSoldProducts(id:number){
    const products = await db.product.findMany({
        where:{
            userID:id,
            status:false
        },
        orderBy:{
            created_at:"desc"
        }
    })
    if(products){
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

export async function updateUserAvatar(photoUrl:string){
    console.log("hit backend, ",photoUrl)
    const session = await getSession()
    await db.user.update({
        where:{
            id: session.id!
        },
        data:{
            avatar: photoUrl
        }
    })
}