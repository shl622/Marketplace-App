import { formatTime, formatToUsd } from "@/lib/util"
import Image from "next/image"
import Link from "next/link"

interface ListProductProps{
    title:string,
    price:number,
    created_at:Date,
    photo:string,
    id:number
}

export default function ListProduct({
    title,
    price,
    created_at,
    photo,
    id
}: ListProductProps){
    return(
        <Link href={`/products/${id}`} className="flex gap-5">
            <div className="relative size-28 rounded-md overflow-hidden">
                <Image fill sizes="120px" src={`${photo}/thumbnail`} className="object-cover" alt={title} quality={100}/>
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-lg text-white">{title}</span>
                <span className="text-sm text-neutral-400">{formatTime(created_at.toString())}</span>
                <span className="text-lg text-neutral-300">$ {formatToUsd(price)}</span>
            </div>
        </Link>
    )
}