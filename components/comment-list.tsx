import { getComments } from "@/app/(id)/posts/[id]/actions"
import getSession from "@/lib/session"
import { formatTime } from "@/lib/util"
import { UserIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import DeleteCommentButton from "./comment-delete"
import db from "@/lib/db"

interface CommentProps {
    postId: number
}

async function postOwner(postId: number) {
    const post = await db.post.findUnique({
        where: {
            id: postId
        },
    })
    if(post){
        return post.userId
    }
}

export default async function CommentList({ postId }: CommentProps) {
    const session = await getSession()
    const comments = await getComments(postId)
    const postOwnerId = await postOwner(postId)
    return (
        <div className="mt-6">
            {comments.map((comment) => (
                <div className="flex justify-between border-b border-neutral-500 last:pb-0 last:border-b-0">
                    <div key={comment.id} className="pb-5 mt-5 flex flex-col gap-2 ">
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
                            {postOwnerId!== comment.user.id ? (
                                <div>
                                    <span className="text-sm font-semibold">{comment.user.username}</span>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <span className="text-sm font-semibold">{comment.user.username}</span>
                                    <span className="text-sm italic text-orange-400">(OP)</span>
                                </div>
                            )}
                        </div>
                        <h2>{comment.payload}</h2>
                        <div className="text-xs text-neutral-400">
                            <span>{formatTime(comment.created_at.toString())}</span>
                        </div>
                    </div>
                    {comment.user.id === session.id! ? (
                        <div className="flex items-center underline *:text-sm text-neutral-400">
                            <DeleteCommentButton commentId={comment.id} />
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    )
}