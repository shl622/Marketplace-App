"use server"

import db from "@/lib/db"
import getSession from "@/lib/session"
import { revalidatePath, revalidateTag } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { z } from "zod"

const productSchema = z.object({
    id: z.coerce.number().optional(),
    photo: z.string({
        required_error: "Photo is required"
    }),
    title: z.string({
        required_error: "Title is required"
    }),
    price: z.coerce.number({
        required_error: "Price is required"
    }),
    description: z.string({
        required_error: "Description is required"
    }),
})

async function getProduct(id: number) {
    const product = await db.product.findUnique({
        where: {
            id
        }
    })
    return product
}

export async function deltePhoto(id: string) {
    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CDF_ID}/images/v1/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${process.env.CDF_TOKEN}`,
                "Content-Type": "application/json",
            },
        }
    )
    return response.status
}

export async function updateProduct(_: any, formData: FormData) {
    const session = await getSession()
    if (!session.id) {
        return
    }
    const data = {
        id: formData.get("id"),
        photo: formData.get("photo"),
        title: formData.get("title"),
        price: formData.get("price"),
        description: formData.get("description"),
    }
    const result = productSchema.safeParse(data)
    if (!result.success) {
        return result.error.flatten()
    }
    else {
        const product = await db.product.update({
            where: {
                id: result.data.id,
            },
            data: {
                title: result.data.title,
                description: result.data.description,
                price: result.data.price,
                photo: result.data.photo,
            }
        })
        //revalidate cache when user adds product
        revalidatePath("/home")
        revalidatePath(`/products/${product.id}`)
        revalidateTag("/product-detail")
        redirect(`/products/${product.id}`)
    }
}

export default async function getOriginalProduct(id: number) {
    const product = await getProduct(id)
    if (!product) {
        return notFound()
    }
    else {
        return ({
            id: product.id,
            title: product.title,
            photo: product.photo,
            price: product.price,
            description: product.description,
            userId: product.userID
        })
    }
}