import { getIsOwner } from "@/app/editPost/[id]/action";
import getOriginalProduct from "./action";
import EditForm from "@/components/edit-form";
import { unstable_cache as nextCache } from "next/cache";
import { notFound } from "next/navigation";

//use cached data instead of calling db
const getCachedProduct = nextCache(getOriginalProduct, ["product-detail"], {
    tags: ["product-detail"]
})

export default async function editProduct({ params
}: { params: { id: string } }) {
    const id = Number(params.id)
    const product = await getCachedProduct(id)
    const isOwner = await getIsOwner(product.userId)
    if (!isOwner){
        return notFound()
    }
    return (
        <div>
            <EditForm {...product} />
        </div>
    )
}