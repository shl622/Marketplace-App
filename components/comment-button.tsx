"use client"

import { uploadComment } from "@/app/posts/[id]/actions"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { useFormState } from "react-dom";
interface CommentProps {
    postId: number
}

export default function Comment({ postId }: CommentProps) {
    const handleComment = async (_:any,formData:FormData) =>{
        console.log("post id is ", postId)
        uploadComment(_,formData,postId)
    }
    const [state, dispatch] = useFormState(handleComment, null);
    return (
        <div className="mt-16">
            <form className="flex flex-row gap-2" action={dispatch}>
                <input
                    name="comment"
                    placeholder="Comment here"
                    className="bg-transparent rounded-md w-full focus:outline-none ring-1 
                    focus:ring-3 transition ring-neutral-200 focus:ring-orange-500 border-none
                    placeholder:text-neutral-400"
                />
                <button>
                    <PaperAirplaneIcon className="size-7 hover:bg-orange-500" />
                </button>
            </form>
        </div>
    )
}