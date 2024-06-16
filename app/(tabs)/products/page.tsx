import db from "@/lib/db"
import ListProduct from "@/components/list-product"
import { Prisma } from "@prisma/client"
import productList from "@/components/product-list"
import ProductList from "@/components/product-list"

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
        take:1,
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
        </div>
    )
}