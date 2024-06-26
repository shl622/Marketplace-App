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

export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>

export default async function ChatRoom({ params }: { params: { id: string } }) {
    const room = await getRoom(params.id)
    if (!room) {
        return notFound()
    }
    const product = await getProduct(room.productId)
    const initialMessages = await getMessages(params.id)
    const session = await getSession()
    return (
        <div>
            <div className="relative">
                <Link  className="absolute w-full" href={`/products/${room.productId}`}>
                    <div className="flex flex-row gap-5 w-full bg-neutral-800">
                        <Image width={100} height={100} src={`${product!.photo}/banner`} alt={product!.title} />
                        <div className="flex flex-col gap-5 p-3">
                            <span className="text-md text-white">{product!.title}</span>
                            <span className="text-sm text-neutral-400">${formatToUsd(product!.price)}</span>
                        </div>
                    </div>
                </Link>
            </div>
            <ChatMessagesList userId={session.id!} initialMessages={initialMessages} />
        </div>
    )
}