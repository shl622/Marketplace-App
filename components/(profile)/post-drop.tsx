"use client"

import { formatTime } from "@/lib/util"
import Link from "next/link"

interface PostProp {
    id: number
    title: string
    views: number
    created_at: Date
}

export default function PostDropList({ id, title, views, created_at }: PostProp) {
    return (
        <Link href={`/posts/${id}`}>
            <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                    <span className="text-white">{title}</span>
                    <span className="text-sm text-neutral-400">{views} views</span>
                </div>
                <span className="text-sm text-neutral-500">{formatTime(created_at.toString())}</span>
            </div>
        </Link>
    )
}