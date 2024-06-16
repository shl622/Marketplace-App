"use client"

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
import { uploadProduct } from "./action";
import { MB, addImageMsg } from "@/lib/constants";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import Link from "next/link";

export default function AddProduct() {
    const [preview, setPreview] = useState<string>("")

    //handle when file uploaded is greater than 10MB 
    const isOversizeImage = (file: File): boolean => {
        if (file.size > 10 * MB) {
            alert("Please upload images less than 10MB")
            return true
        }
        return false
    }
    //handle when file is uploaded
    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = event
        if (!files) {
            return
        }
        const file = files[0]
        if (isOversizeImage(file)) {
            return
        }
        const url = URL.createObjectURL(file)
        setPreview(url)
    }

    //handle when image file is not uploaded
    const onSubmitData = (event: FormEvent) => {
        if (!preview) {
            event.preventDefault()
            alert(addImageMsg)
            return
        }
    }

    return (
        <div>
            <Link href="/products" className="size-15 relative top-2.5 bottom-0 right-0 left-5">
                <FaRegArrowAltCircleLeft className="size-10"/>
            </Link>
            <form action={uploadProduct}
                onSubmit={(event) => onSubmitData(event)}
                className="p-5 flex flex-col gap-5">
                <label htmlFor="photo" className="border-2
                aspect-square flex items-center justify-center flex-col
                text-netural-300 border-neutral-300 rounded-md border-dashed
                cursor-pointer bg-center bg-cover"
                    style={{
                        backgroundImage: `url(${preview})`,
                    }}
                >
                    {preview === "" ? (
                        <>
                            <PhotoIcon className="w-20" />
                            <div className="text-neutral-400 text-sm"> Add Photo</div>
                        </>) : null}
                </label>
                <input onChange={onImageChange} type="file" id="photo" name="photo"
                    className="hidden"
                    accept="image/*" />
                <Input name="title" required placeholder="Title" type="text" />
                <Input name="price" type="number" required placeholder="Price" />
                <Input name="description" type="text" required placeholder="Please describe the item." />
                <Button text="Upload" loadMsg="Uploading..." />
            </form>
        </div>
    )
}