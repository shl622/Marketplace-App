import db from "@/lib/db"
import ListProduct from "@/components/list-product"
import { Prisma } from "@prisma/client"
import productList from "@/components/product-list"
import ProductList from "@/components/product-list"
import { PlusIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

async function getInitialProducts(){
    const products = await db.product.findMany({
        select:{
            title:true,
            price:true,
            created_at:true,
            photo:true,
            id:true
        },
        //take tells how many data points to fetch
        take:10,
        //sort by youngest to oldest product
        orderBy:{
            created_at:"desc"
        }
    })
    return products
}

export type initialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>

export default async function Products(){
    const initialProducts = await getInitialProducts()
    //placeholder atm
    return(
        <div>
            <ProductList initialProducts={initialProducts}/>
            <Link href="/products/add" 
            className="bg-orange-500 flex items-center justify-center rounded-full
            size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400 ">
            <PlusIcon className="size-10"/>
            </Link>
        </div>
    )
}