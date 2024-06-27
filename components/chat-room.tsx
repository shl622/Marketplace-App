"use client";

import { saveMessage } from "@/app/(id)/chats/[id]/action";
import { InitialChatMessages } from "@/app/(id)/chats/[id]/page";
import { formatTime } from "@/lib/util";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

//public api keys for Supabase
//using string ID for chatroom- so not easy for channels to be compromised
const SUPABASE_API_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1ZmhlZHhkamthamtueXZpaWhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0MzYyNjMsImV4cCI6MjAzNTAxMjI2M30.2FaSU74PHBj1eTUKwPmnWS0dHaM0xvgWTviPwirY0H0"
const SUPABASE_URL = "https://qufhedxdjkajknyviihm.supabase.co"

interface ChatMessageListProps {
    initialMessages: InitialChatMessages
    userId: number
    chatRoomId: string
    username: string
    avatar: string
}
export default function ChatMessagesList({
    initialMessages,
    userId,
    chatRoomId,
    username,
    avatar
}: ChatMessageListProps) {
    const [messages, setMessages] = useState(initialMessages)
    const [message, setMessage] = useState("")
    const channel = useRef<RealtimeChannel>()

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = event;
        setMessage(value)
    };

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setMessages(prevMsgs => [...prevMsgs, {
            id: Date.now(),
            payload: message,
            created_at: new Date(),
            userId,
            user: {
                username: "string",
                avatar: "xxxxx",
            }
        }])
        channel.current?.send(
            {
                type: "broadcast",
                event: "message",
                payload: {
                    id: Date.now(),
                    payload: message,
                    created_at: new Date(),
                    userId,
                    user:{
                        username,
                        avatar
                    }
                }
            }

        )
        await saveMessage(message,chatRoomId)
        setMessage("");
    };

    //run only once on boot of chatroom
    useEffect(() => {
        const client = createClient(SUPABASE_URL, SUPABASE_API_PUBLIC_KEY)
        channel.current = client.channel(`room-${chatRoomId}`)
        channel.current.on("broadcast", { event: "message" }, (payload) => {
            setMessages((prevMsgs)=>[...prevMsgs,payload.payload])
        }).subscribe()
        return () => {
            //unsubscribe when leaving
            channel.current?.unsubscribe()
        }
    }, [chatRoomId])

    return (
        <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex gap-2 items-start ${message.userId === userId ? "justify-end" : ""
                        }`}
                >
                    {message.userId === userId ? null : (
                        <Image
                            src={message.user.avatar ? message.user.avatar : ""}
                            alt={message.user.username}
                            width={50}
                            height={50}
                            className="size-8 rounded-full"
                        />
                    )}
                    <div
                        className={`flex flex-col gap-1 ${message.userId === userId ? "items-end" : ""
                            }`}
                    >
                        <span
                            className={`${message.userId === userId ? "bg-neutral-500" : "bg-orange-500"
                                } p-2.5 rounded-md`}
                        >
                            {message.payload}
                        </span>
                        <span className="text-xs">
                            {formatTime(message.created_at.toString())}
                        </span>
                    </div>
                </div>
            ))}
            <form className="flex relative" onSubmit={onSubmit}>
                <input
                    required
                    onChange={onChange}
                    value={message}
                    className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
                    type="text"
                    name="message"
                    placeholder="Write a message..."
                />
                <button className="absolute right-0">
                    <ArrowUpCircleIcon className="size-10 text-orange-500 transition-colors hover:text-orange-300" />
                </button>
            </form>
        </div>
    );
}