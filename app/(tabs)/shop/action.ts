"use server"

import db from "@/lib/db"
import getSession from "@/lib/session"
import { Prisma } from "@prisma/client"

export async function findAllLikes() {
    const session = await getSession()
    const likedProducts = await db.love.findMany({
        where: {
            userId: session.id
        },
        orderBy: {
            created_at: "desc"
        },
        select: {
            productId: true
        }
    })
    if (likedProducts) {
        return likedProducts
    }
}

export async function likedProductsList(likedProducts: Array<{ productId: number }>) {
    const likedProductsList = likedProducts.map((product) => (
        product.productId
    ))
    const finalRes = await db.product.findMany({
        where:{
            id:{
                in: likedProductsList
            }
        }
    })
    return finalRes
}