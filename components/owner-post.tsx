"use client"

import { deletePost } from "@/app/(id)/posts/[id]/actions"
import Link from "next/link"

interface EDButtonProps {
    postId: number
    userId: number
}

async function onClick(postId:number,userId:number){
    if(window.confirm("Do you want to delete?")){
        await deletePost(postId,userId)
    }
}
//deletePost(postId,userId)

export default function EditDeleteButton({ postId,userId }: EDButtonProps) {
    return (
        <div className="flex gap-1">
            <Link href={`/editPost/${postId}`} className="underline text-neutral-400 text-sm">Edit Post</Link>
            <button className="underline text-neutral-400 text-sm"
                onClick={()=>onClick(postId,userId)}>| Delete</button>
        </div>
    )
}