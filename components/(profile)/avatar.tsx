"use client"

import { getUploadUrl } from "@/app/(add)/addProduct/action"
import { updateUserAvatar } from "@/app/(tabs)/profile/action"
import { UserIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useRef, useState } from "react"

interface avatarProps {
    username: string
    avatar: string
}

const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = event
    if (!files) {
        console.log("no file")
        return
    }
    const file = files[0]
    const { success, result } = await getUploadUrl()
    if (success) {
        const { id, uploadURL } = result
        console.log(id, uploadURL)
        const cloudflareForm = new FormData()
        cloudflareForm.append("file", file)
        const response = await fetch(uploadURL, {
            method: "post",
            body: cloudflareForm
        })
        console.log(await response.text())
        if (response.status !== 200){
            console.log("Error occured with Cloudflare")
            return
        }
        const photoUrl = `https://imagedelivery.net/XvN8YOhPq_mDUvyVxeq5wg/${id}/thumbnail`
        updateUserAvatar(photoUrl)
    }

}

export default function Avatar({ avatar, username }: avatarProps) {
    const [isHovered, setIsHovered] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    return (
        <div>
            <button
                className="relative hover:bg-gray-500 rounded-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={(event) => {
                    event.preventDefault()
                    if (fileInputRef.current) {
                        fileInputRef.current.click()
                    }
                }
                }>
                {avatar !== null ? (
                    <Image
                        className="size-28 rounded-full"
                        src={avatar}
                        width={100}
                        height={100}
                        alt={username}
                    />
                ) : (
                    <UserIcon className="size-28 rounded-full" />
                )}
                {isHovered && (
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-75
                flex items-center justify-center rounded-full text-white text-sm">
                        Click to change avatar
                    </div>
                )}
            </button>
            <input
                className="hidden"
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    )
}