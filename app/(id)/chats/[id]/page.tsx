import Image from "next/image"
import ChatMessagesList from "@/components/chat-room"
import db from "@/lib/db"
import getSession from "@/lib/session"
import { Prisma } from "@prisma/client"
import { notFound } from "next/navigation"
import { formatToUsd } from "@/lib/util"
import Link from "next/link"

async function getRoom(id: string) {
    const room = await db.chatRoom.findUnique({
        where: {
            id
        },
        include: {
            users: {
                select: { id: true }
            },
            product: {
                select: {
                    id: true
                }
            }
        }
    })
    if (room) {
        const session = await getSession()
        //check if the current logged in user belongs to chat
        const isValid = Boolean(room.users.find(user => user.id === session.id!))
        if (!isValid) {
            return null
        }
    }
    return room
}

async function getProduct(id: number) {
    const product = await db.product.findUnique({
        where: {
            id
        },
        select: {
            title: true,
            price: true,
            photo: true
        }
    })
    return product
}

async function getMessages(chatRoomId: string) {
    const messages = await db.message.findMany({
        where: {
            chatRoomId
        },
        select: {
            id: true,
            payload: true,
            created_at: true,
            userId: true,
            user: {
                select: {
                    avatar: true,
                    username: true,
                }
            }
        }
    })
    return messages
}

async function getUserProfile() {
    const session = await getSession()
    const user = await db.user.findUnique({
        where: {
            id: session.id!
        },
        select: {
            username: true,
            avatar: true
        }
    })
    return user
}

export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>

export default async function ChatRoom({ params }: { params: { id: string } }) {
    const room = await getRoom(params.id)
    if (!room) {
        return notFound()
    }
    const product = await getProduct(room.productId)
    const initialMessages = await getMessages(params.id)
    const session = await getSession()
    const user = await getUserProfile()
    if (!user) {
        return notFound()
    }
    return (
        <div>
            <div className="relative">
                <div className="flex gap-5 bg-neutral-800">
                    <Image width={100} height={100} src={`${product!.photo}/banner`} alt={product!.title} />
                    <div className="flex flex-col justify-between">
                        <Link className="flex flex-col gap-5" href={`/products/${room.productId}`}>
                            <span className="text-md text-white">{product!.title}</span>
                            <span className="text-sm text-neutral-400">${formatToUsd(product!.price)}</span>
                        </Link>
                        <Link href="/chat">
                            <span className="text-sm underline">Return to Chat</span>
                        </Link>
                    </div>
                </div>
            </div>
            <ChatMessagesList
                chatRoomId={params.id}
                userId={session.id!}
                username={user.username}
                avatar={user.avatar!}
                initialMessages={initialMessages} />
        </div>
    )
}