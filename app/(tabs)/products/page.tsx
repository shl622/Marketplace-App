import db from "@/lib/db"
import ListProduct from "@/components/list-product"

async function getProducts(){
    const products = await db.product.findMany({
        select:{
            title:true,
            price:true,
            created_at:true,
            photo:true,
            id:true
        }
    })
    return products
}

export default async function Products(){
    const products = await getProducts()
    //placeholder atm
    return(
        <div className="p-5 flex flex-col gap-5">
            {products.map(product => <ListProduct key={product.id}{...product}/>)}
        </div>
    )
}