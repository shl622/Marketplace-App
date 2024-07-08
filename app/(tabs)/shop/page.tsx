import ListProduct from "@/components/list-product"
import { findAllLikes, likedProductsList } from "./action"

export const metadata = {
    title: "Shop",
}

export default async function Shop() {
    const likedProducts = await findAllLikes()
    const likedList = await likedProductsList(likedProducts!)
    if(likedList.length==0){
        return(
            <div className="flex justify-center p-5 *:text-neutral-500">
                <span>No liked items</span>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-5 p-5">
            {likedList.map((product) => (
                <ListProduct key={product.id} {...product} />
            ))}
        </div>
    )
}