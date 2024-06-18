import getOriginalProduct from "./action";
import EditForm from "@/components/edit-form";

export default async function editProduct({ params
}: { params: { id: string } }) {
    const id = Number(params.id)
    const product = await getOriginalProduct(id)
    console.log(product, typeof(product))
    return (
        <div>
            <EditForm {...product}/>
        </div>
    )
}