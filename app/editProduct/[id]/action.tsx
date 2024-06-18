import db from "@/lib/db"
import { notFound } from "next/navigation"

async function getProduct(id: number) {
    const product = await db.product.findUnique({
        where: {
            id
        }
    })
    return product
}

export default async function getOriginalProduct(id: number) {
    const product = await getProduct(id)
    if (!product) {
        return notFound()
    }
    else{
        return ({
            title:product.title,
            photo:product.photo,
            price:product.price,
            description:product.description
        })
    }
}