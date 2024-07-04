"use client"

import { useEffect, useRef, useState } from "react";
import ListProduct from "./list-product";
import { initialProducts } from "@/app/(tabs)/home/page";
import { getMoreProducts } from "@/app/(tabs)/home/action";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

interface ProductsListProps {
    initialProducts: initialProducts
}

export default function ProductList({ initialProducts }: ProductsListProps) {
    const [products, setProducts] = useState(initialProducts)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [isLastPage, setIsLastPage] = useState(false)
    const trigger = useRef<HTMLSpanElement>(null)
    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
                const element = entries[0]
                if (element.isIntersecting && trigger.current) {
                    observer.unobserve(trigger.current)
                    setIsLoading(true)
                    const newProducts = await getMoreProducts(page + 1)
                    if (newProducts.length !== 0) {
                        setPage((prev) => prev + 1)
                        setProducts((prev) => [...prev, ...newProducts])
                    } else {
                        setIsLastPage(true)
                    }
                    setIsLoading(false)
                }
            },{
                threshold:1.0,
                rootMargin: "0px 0px -100px 0px"
            }
        )
        //observe the button
        if (trigger.current) {
            observer.observe(trigger.current)
        }
        //clean up 
        return () => {
            observer.disconnect()
        }
    }, [page])
    return (
        <div className="p-5 flex flex-col gap-5">
            {products.map((product) => (
                <ListProduct key={product.id} {...product} />
            ))}
            <div className="relative w-full">
                <Link href="/addProduct"
                    className="bg-orange-500 flex items-center justify-center rounded-full
            size-16 absolute right-8 text-white transition-colors hover:bg-orange-400 ">
                    <PlusIcon className="size-10"/>
                </Link>
            </div>
            {!isLastPage?(
                <span
                ref={trigger}
                style={{
                    marginTop:`${page+1*900}vh`,
                }}
                className="mb-96 text-sm font-semibold
                bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md
                hover:opacity-90 active:scale-95">
                {isLoading ? "loading..." : "Show More"}
            </span>
            ): null}
        </div>
    )
}