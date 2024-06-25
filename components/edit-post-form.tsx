"use client"

import Link from "next/link"
import { useFormState } from "react-dom"
import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import Input from "./input"
import Button from "./button"
import { updatePost } from "@/app/editPost/[id]/action"


interface postProps {
    id: number
    title: string
    description: string
}


export default function EditPost({ id, title, description }: postProps) {
    const editPost = async (_: any, formData: FormData) => {
        formData.set("id", id + "")
        return updatePost(_, formData);
    };
    const [state, dispatch] = useFormState(editPost, null);
    return (
        <div>
            <Link href="/posts" className="size-15 relative top-2.5 bottom-0 right-0 left-5">
                <FaRegArrowAltCircleLeft className="size-10" />
            </Link>
            <form action={dispatch} className="p-5 flex flex-col gap-5">
                <Input name="title" required placeholder="Title" type="text"
                    defaultValue={title}
                />
                <textarea name="description" required
                    className="bg-transparent rounded-md w-full h-96 focus:outline-none ring-1 
                    focus:ring-3 transition ring-neutral-200 focus:ring-orange-500 border-none
                    placeholder:text-neutral-400" defaultValue={description ? (description) : "Share anything with the community."} />
                <Button text="Confirm Edit" loadMsg="Uploading Edit..." />
            </form>
        </div>
    )
}
