"use client"

import Button from "@/components/button"
import Input from "@/components/input"
import Link from "next/link"
import { FaRegArrowAltCircleLeft } from "react-icons/fa"


export default function AddPost() {
    return (
        <div>
            <Link href="/posts" className="size-15 relative top-2.5 bottom-0 right-0 left-5">
                <FaRegArrowAltCircleLeft className="size-10" />
            </Link>
            <form className="p-5 mt-3 flex flex-col gap-5">
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