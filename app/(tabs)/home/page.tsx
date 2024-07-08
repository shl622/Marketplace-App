import db from "@/lib/db"
import { Prisma } from "@prisma/client"
import ProductList from "@/components/product-list"
import { unstable_cache as nextCache, revalidatePath } from "next/cache"

//getinitialProducts don't need ID
//save the initialProduct load in cache so DB doesn't hit every time
//can use revalidate: n to revalidate the cached data after n seconds
const getCachedProducts = nextCache(getInitialProducts, ['home-products'],{
    tags:["home-products"],
    revalidate: 60
})

async function getInitialProducts() {
    const products = await db.product.findMany({
        where:{
            status:true,
        },
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true,
            _count:{
                select:{
                    loves:true
                }
            }
        },
        //take tells how many data points to fetch
        take: 10,
        //sort by youngest to oldest product
        orderBy: {
            created_at: "desc"
        }
    })
    return products
}

export type initialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>

export const metadata = {
    title: "Home",
}

// forces the page on BUILD to become dynamic so hits db on every refresh
// should use nextCache together
// export const dynamic = "force-dynamic"
// export const revalidate=60

export default async function Home() {
    const initialProducts = await getCachedProducts()
    return (
        <div>
            <ProductList initialProducts={initialProducts} />
        </div>
    )
}