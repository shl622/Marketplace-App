import ListProduct from "@/components/list-product"
import { findAllLikes, likedProductsList } from "./action"

export const metadata = {
    title: "Shop",
}

export default async function Shop() {
    const likedProducts = await findAllLikes()
    const likedList = await likedProductsList(likedProducts!)
    if (likedList.length == 0) {
        return (
            <div className="flex justify-center p-5 *:text-neutral-500">
                <span>No liked items</span>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-5 p-5">
            <div className="flex gap-2 mb-5 mt-2">
                <h1 className="font-bold text-2xl">Liked Products</h1>
                <span className="flex items-center justify-center size-8 bg-orange-500 rounded-full
                        text-lg">
                    {likedList?.length}</span>
            </div>
            {likedList.map((product) => (
                <ListProduct key={product.id} {...product} />
            ))}
        </div>
    )
}