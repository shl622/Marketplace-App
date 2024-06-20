"use client"

import { PaperAirplaneIcon } from "@heroicons/react/24/solid"

export default function Comment() {
    return (
        <div className="mt-16">
            <form className="flex flex-row gap-2">
                <input
                    placeholder="Comment here"
                    className="bg-transparent rounded-md w-full focus:outline-none ring-1 
                    focus:ring-3 transition ring-neutral-200 focus:ring-orange-500 border-none
                    placeholder:text-neutral-400"
                />
                <button>
                    <PaperAirplaneIcon className="size-7 hover:bg-orange-500"/>
                </button>
            </form>
        </div>
    )
}