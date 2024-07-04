import ListProduct from "@/components/list-product"
import { findAllLikes, likedProductsList } from "./action"

export default async function Shop(){
    const likedProducts = await findAllLikes()
    const res = await likedProductsList(likedProducts!)
    console.log(res)
    return(
        <div className="flex flex-col gap-5 p-5">
            {res.map((product)=>(
                <ListProduct key={product.id} {...product}/>
            ))}
        </div>
    )
}