import db from "@/lib/db"
import { notFound } from "next/navigation"

async function getRoom(id: string) {
    const room = await db.chatRoom.findUnique({
        where: {
            id
        },
        include: {
            users: {
                select: { id: true }
            }
        }
    })
    console.log(room)
    return room
}

export default async function ChatRoom({ params }: { params: { id: string } }) {
    const room = await getRoom(params.id)
    if (!room) {
        return notFound()
    }
    return(
        <h1>chat</h1>
    )
}