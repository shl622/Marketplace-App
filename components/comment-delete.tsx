"use client"

import { deleteComment } from "@/app/(id)/posts/[id]/actions"

async function handleDelete(commentId:number){
    if(window.confirm("Are you sure you want to delete this comment?")){
        await deleteComment(commentId)
    }
}

interface DelCommentButtonProp{
    commentId:number
}
export default function DeleteCommentButton({commentId}:DelCommentButtonProp) {
    return (
        <div className="flex items-center underline *:text-sm text-neutral-400">
            <button onClick={()=>handleDelete(commentId)}>Delete</button>
        </div>
    )
}