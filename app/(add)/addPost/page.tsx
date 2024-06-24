"use client"

import Button from "@/components/button"
import Input from "@/components/input"
import Link from "next/link"
import { useFormState } from "react-dom"
import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import { uploadPost } from "./action"


export default function AddPost() {
    const handlePost = async (_:any,formData:FormData) => {
        return uploadPost(_,formData)
    }
    const [state, dispatch] = useFormState(handlePost, null);
    return (
        <div>
            <Link href="/posts" className="size-15 relative top-2.5 bottom-0 right-0 left-5">
                <FaRegArrowAltCircleLeft className="size-10" />
            </Link>
            <form action={dispatch} className="p-5 mt-3 flex flex-col gap-5">
                <Input name="title" required placeholder="Title" type="text" />
                <textarea name="description" required placeholder="Share anything with the community."
                    className="bg-transparent rounded-md w-full h-96 focus:outline-none ring-1 
                    focus:ring-3 transition ring-neutral-200 focus:ring-orange-500 border-none
                    placeholder:text-neutral-400"/>
                <Button text="Upload" loadMsg="Uploading..." />
            </form>
        </div>
    )
}