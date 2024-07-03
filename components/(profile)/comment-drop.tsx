"use client"

import { formatTime } from "@/lib/util"
import Link from "next/link"

interface CommentProp{
    payload:string,
    created_at:Date,
    postId:number
}

export default function CommentDropList({payload,created_at,postId}:CommentProp){
    return(
        <Link href={`/posts/${postId}`} className="text-white">
            <div className="flex flex-col">
                <span className="text-lg">{payload}</span>
                <span className="text-sm text-neutral-500">{formatTime(created_at.toString())}</span>
            </div>
        </Link>
    )
}