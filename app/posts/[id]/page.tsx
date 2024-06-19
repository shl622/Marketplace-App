import db from "@/lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import { formatTime } from "@/lib/util"
import { EyeIcon, HandThumbUpIcon, UserIcon } from "@heroicons/react/24/solid"
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline"
import getSession from "@/lib/session"
import { revalidatePath } from "next/cache"

async function getPost(id: number) {
    //find the post with provided id and increment view num by 1
    //will throw error if post is not found in db (use try/catch for this error)
    try {
        const post = await db.post.update({
            where: {
                id,
            },
            data: {
                views: {
                    increment: 1
                }
            },
            include: {
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    }
                },
                _count: {
                    select: {
                        comments: true,
                        likes: true
                    }
                }
            }
        })
        return post
    }
    catch (e) {
        return null
    }
}

async function getLike(postId: number) {
    const session = await getSession()
    const like = await db.like.findUnique({
        where: {
            id: {
                postId,
                userId: session.id!,
            }
        }
    })
    return Boolean(like)
}
export default async function PostDetail({ params }: { params: { id: string } }) {
    const id = Number(params.id)
    if (isNaN(id)) {
        return notFound()
    }
    const post = await getPost(id)
    if (!post) {
        return notFound()
    }

    //like post
    const likePost = async () => {
        "use server"
        const session = await getSession()
        try {
            await db.like.create({
                data: {
                    postId: id,
                    userId: session.id!,
                }
            })
            revalidatePath(`/posts/${id}`)
        } catch (e) {
            console.log(e)
        }
    }

    //dislike post
    const dislikePost = async () => {
        "use server"
        try {
            const session = await getSession()
            await db.like.delete({
                where: {
                    id: {
                        postId: id,
                        userId: session.id!,
                    }
                }
            })
            revalidatePath(`/posts/${id}`)
        } catch (e) {
            console.log(e)
        }
    }
    const isLiked = await getLike(id)

    return (
        <div className="p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
                {post.user.avatar !== null ? (
                    <Image
                        className="size-7 rounded-full"
                        src={post.user.avatar}
                        width={28}
                        height={28}
                        alt={post.user.username}
                    />
                ) : (
                    <UserIcon className="size-7 rounded-full" />
                )}
                <div>
                    <span className="text-sm font-semibold">{post.user.username}</span>
                    <div className="text-xs">
                        <span>{formatTime(post.created_at.toString())}</span>
                    </div>
                </div>
            </div>
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="mb-5">{post.description}</p>
            <div className="flex flex-col gap-5 items-start">
                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                    <EyeIcon className="size-5" />
                    <span>Views {post.views}</span>
                </div>
                <form action={isLiked ? dislikePost : likePost}>
                    <button
                        className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 hover:bg-neutral-800 transition-colors
                            ${isLiked ? "bg-orange-500 text-white border-orange-500" : ""}`}>
                        {isLiked ? (<HandThumbUpIcon className="size-5" />)
                            : (<OutlineHandThumbUpIcon className="size-5" />)}
                        {isLiked ? (<span>{post._count.likes}</span>) :
                            (<span>Like ({post._count.likes})</span>)}
                    </button>
                </form>
            </div>
        </div>
    )
}