import { formatTime, formatToUsd } from "@/lib/util"
import Image from "next/image"
import Link from "next/link"
import { HeartIcon } from "@heroicons/react/24/outline";

interface ListProductProps {
    title: string,
    price: number,
    created_at: Date,
    photo: string,
    id: number,
    _count: {
        loves: number
    }
}

export default function ListProduct({
    title,
    price,
    created_at,
    photo,
    id,
    _count
}: ListProductProps) {
    return (
        <div className="flex gap-5 justify-between">
            <Link href={`/products/${id}`}>
                <div className="flex gap-5">
                    <div className="relative size-28 rounded-md overflow-hidden">
                        <Image fill sizes="120px" src={`${photo}/thumbnail`} className="object-cover" alt={title} quality={100} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-lg text-white">{title}</span>
                        <span className="text-sm text-neutral-400">{formatTime(created_at.toString())}</span>
                        <span className="text-lg text-neutral-300">$ {formatToUsd(price)}</span>
                    </div>
                </div>
            </Link>
            <div className="flex items-center">
                <HeartIcon className="size-4 text-white" />
                <span className="ml-2 text-sm text-neutral-300">{_count.loves}</span>
            </div>
        </div>
    )
}