"use client"

import { formatTime } from "@/lib/util"
import Link from "next/link"
import { UserIcon } from "@heroicons/react/24/solid"

export interface Message {
    id: string
    payload: string
    created_at: Date
    user: {
        username: string
        avatar: string | null
    }
}

export interface ChatRoomProps {
    chatRooms: Record<string, Message | undefined>
}


export default function ChatList({ chatRooms }: ChatRoomProps) {
    return (
        <div className="flex flex-col gap-5">
            {Object.keys(chatRooms).map((chatRoomId) => {
                const message = chatRooms[chatRoomId]
                if (!message) {
                    return null
                }
                return (
                    <Link key={chatRoomId} href={`/chats/${chatRoomId}`} className="
                    text-neutral-400">
                        <div className="flex flex-row gap-16 items-center p-4 border-b">
                            {message.user.avatar ? (
                                <img src={message.user.avatar} alt={`${message.user.username}`} className="w-12 h-12 rounded-full" />
                            ) : (
                                <div className="w-12 h-12 rounded-full">
                                    <UserIcon />
                                </div>
                            )}
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold">{message.user.username}</span>
                                <span className="text-gray-100">{message.payload}</span>
                                <span className="font-white
                                text-xs"> {formatTime(message.created_at.toString())} </span>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )

}