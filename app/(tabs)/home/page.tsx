import db from "@/lib/db"
import { Prisma } from "@prisma/client"
import ProductList from "@/components/product-list"
import { PlusIcon } from "@heroicons/react/24/solid"
import { unstable_cache as nextCache, revalidatePath } from "next/cache"
import Link from "next/link"

//getinitialProducts don't need ID
//save the initialProduct load in cache so DB doesn't hit every time
//can use revalidate: n to revalidate the cached data after n seconds
// const getCachedProducts = nextCache(getInitialProducts, ['home-products'])

async function getInitialProducts() {
    const products = await db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true
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
    const initialProducts = await getInitialProducts()
    return (
        <div>
            <ProductList initialProducts={initialProducts} />
            <div className="fixed bottom-24 right-12 max-w-screen-sm mx-auto">
                <Link href="/addProduct"
                    className="bg-orange-500 flex items-center justify-center rounded-full
            size-16 text-white transition-colors hover:bg-orange-400 ">
                    <PlusIcon className="size-10"/>
                </Link>
            </div>
        </div>
    )
}