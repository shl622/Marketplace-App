"use server"

import db from "@/lib/db";

export async function getMoreProducts(page:number){
    const products = await db.product.findMany({
        select:{
            title:true,
            price:true,
            created_at:true,
            photo:true,
            id:true
        },
        //take tells how many data points to fetch
        //next load skips first one
        skip:1,
        take:1,
        //sort by youngest to oldest product
        orderBy:{
            created_at:"desc"
        }
    })
    return products
}