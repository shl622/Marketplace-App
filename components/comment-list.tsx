import db from "@/lib/db"
import { formatTime } from "@/lib/util"
import { UserIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

interface CommentProps {
    postId: number
}

export default async function CommentList({ postId }: CommentProps) {
    //to-do
    //create a comment List skeleton
    //use optimistic update for comment upload
    //using db query and session id, if isOwner, show comment as owner
    //filter the list new>old

    async function getComments(postId:number) {
        const comments = await db.comment.findMany({
            where:{
                postId
            },
            select: {
                id: true,
                payload: true,
                created_at: true,
                user: {
                    select: {
                        username: true,
                        avatar: true
                    }
                }
            },
            orderBy: {
                created_at: "desc"
            },
        })
        return comments
    }

    const comments = await getComments(postId)

    return (
        <div className="mt-32">
            {comments.map((comment) => (
                <div key={comment.id} className="pb-5 mt-5 mb-5 border-b border-neutral-500
                flex flex-col gap-2 last:pb-0 last:border-b-0">
                    <div className="flex items-center gap-2 mb-2">
                        {comment.user.avatar !== null ? (
                            <Image
                                className="size-5 rounded-full"
                                src={comment.user.avatar}
                                width={28}
                                height={28}
                                alt={comment.user.username}
                            />
                        ) : (
                            <UserIcon className="size-5 rounded-full" />
                        )}
                        <div>
                            <span className="text-sm font-semibold">{comment.user.username}</span>
                        </div>
                    </div>
                    <h2>{comment.payload}</h2>
                    <div className="text-xs">
                        <span>{formatTime(comment.created_at.toString())}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}