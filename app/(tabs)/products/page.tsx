async function getProducts(){
    await new Promise((resolve)=> setTimeout(resolve,10000))
}

export default async function Products(){
    const products = await getProducts()
    //placeholder atm
    return(
        <div>
            <h1 className="text-white text-4xl">Products!</h1>
        </div>
    )
}