import db from "@/lib/db";
import Loading from "./loading";
import getSession from "@/lib/session";
import ChatList from "@/components/chat-list";
import { Prisma } from "@prisma/client";

async function getChatRooms() {
    const session = await getSession()
    const chatRooms = await db.chatRoom.findMany({
        where: {
            users: {
                some: {
                    id: {
                        in: [session.id!]
                    }
                }
            }
        },
        select: {
            id: true,
        }
    })
    return chatRooms
}

async function getChatInfo(chatRooms: Array<{id:string}>) {
    const chatInfo: {[key:string]:{id:number,payload:string,user:any}} = {}
    await Promise.all(chatRooms.map(async chatRoom => {
        const message = await db.message.findMany({
            where:{
                chatRoomId:chatRoom.id,
            },
            select: {
                id:true,
                payload: true,
                created_at:true,
                user: true,
            },
            orderBy: {
                created_at: "desc"
            }
        })
        // console.log(`${chatRoom.id} || msg:`, message[0])
        chatInfo[chatRoom.id] = message[0]
    }))
    return chatInfo
}

export const metadata = {
    title: "Chat",
}

export default async function Chat() {
    const chatRooms = await getChatRooms()
    const chatMessages = await getChatInfo(chatRooms)
    return (
        <div>
            {/* @ts-ignore */}
            <ChatList chatRooms={chatMessages}/>
        </div>
    )
}