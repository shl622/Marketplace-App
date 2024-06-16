"use server"

import db from "@/lib/db"
import getSession from "@/lib/session"
import { redirect } from "next/navigation"
import { z } from "zod"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const productSchema = z.object({
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

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCEESS_KEY_ID!,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
    }
})

async function uploadFileToS3(file:any,fileName:any){
    const fileBuffer = file
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${fileName}`,
        Body: fileBuffer,
        ContentType: 'image/png',
    })
    try{
        await s3Client.send(command)
        return fileName
    }
    catch(e){
        throw e
    }
}

export async function uploadProduct(_:any,formData: FormData) {
    const data = {
        photo: formData.get("photo"),
        title: formData.get("title"),
        price: formData.get("price"),
        description: formData.get("description"),
    }
    //image validation
    if (data.photo instanceof File){
        const photoData = await data.photo.arrayBuffer();
        const s3Upload = await uploadFileToS3(photoData, data.photo.name)
        console.log(s3Upload,"s3upload after name")
        data.photo = `${process.env.AWS_S3_URI}/${s3Upload}`
    }

    const result = productSchema.safeParse(data)
    if (!result.success) {
        return result.error.flatten()
    }
    else {
        const session = await getSession()
        if (session.id) {
            const product = await db.product.create({
                data: {
                    title: result.data.title,
                    description: result.data.description,
                    price: result.data.price,
                    photo: result.data.photo,
                    user: {
                        connect: {
                            id: session.id
                        }
                    }
                },
                select: {
                    id: true
                }
            })
            redirect(`/products/${product.id}`)
        }
    }
}