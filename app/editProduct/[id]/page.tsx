import getOriginalProduct from "./action";
import EditForm from "@/components/edit-form";
import { unstable_cache as nextCache } from "next/cache";

//use cached data instead of calling db
const getCachedProduct = nextCache(getOriginalProduct, ["product-detail"], {
    tags: ["product-detail"]
})

export default async function editProduct({ params
}: { params: { id: string } }) {
    const id = Number(params.id)
    const product = await getCachedProduct(id)
    return (
        <div>
            <EditForm {...product} />
        </div>
    )
}