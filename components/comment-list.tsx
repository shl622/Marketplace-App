"use client"

import { PaperAirplaneIcon } from "@heroicons/react/24/solid"

export default function CommentList(){
    //to-do
    //create a comment List skeleton
    //use optimistic update for comment upload
    //using db query and session id, if isOwner, show comment as owner
    //filter the list new>old
    return(
        <div className="flex flex-row gap-5 mt-4 p-3">
            <form className="w-full">
                <input name="comment" className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 
                    focus:ring-3 transition ring-neutral-200 focus:ring-orange-500 border-none
                    placeholder:text-neutral-400"
                    placeholder="Write your comment"/>
            </form>
            <button><PaperAirplaneIcon className="size-6"/></button>
        </div>
    )
}