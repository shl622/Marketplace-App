"use server"

import db from "@/lib/db"
import getSession from "@/lib/session"
import { revalidateTag } from "next/cache"


export async function loveProduct(productId:number){
    const session = await getSession()
    try{
        await db.love.create({
            data:{
                productId: productId,
                userId: session.id!
            }
        })
        revalidateTag(`love-status-${productId}`)
    } catch(e){
        console.log(e)
    }
}

export async function disloveProduct(productId:number){
    try{
        const session = await getSession()
        await db.love.delete({
            where:{
                id:{
                    productId: productId,
                    userId: session.id!
                }
            }
        })
        revalidateTag(`love-status-${productId}`)
    }catch(e){
        console.log(e)
    }
}