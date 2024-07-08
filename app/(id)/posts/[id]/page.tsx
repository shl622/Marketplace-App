import db from "@/lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import { formatTime } from "@/lib/util"
import { EyeIcon, UserIcon } from "@heroicons/react/24/solid"
import getSession from "@/lib/session"
import { unstable_cache as nextCache } from "next/cache"
import LikeButton from "@/components/like-button"
import Comment from "@/components/comment-button"
import CommentList from "@/components/comment-list"
import Link from "next/link"
import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import EditDeleteButton from "@/components/owner-post"


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

async function getIsOwner(userId: number) {
    const session = await getSession()
    if (session.id) {
        return session.id === userId
    }
    return false
}

const getCachedPosts = nextCache(getPost, ["post-detail"], {
    tags: ["post-detail"],
    revalidate: 60
})

async function getLikeStatus(postId: number, userId: number) {
    const isLiked = await db.like.findUnique({
        where: {
            id: {
                postId,
                userId,
            }
        }
    })
    const likeCount = await db.like.count({
        where: {
            postId
        }
    })
    return {
        likeCount,
        isLiked: Boolean(isLiked)
    }
}

async function getCachedLikeStatus(postId: number, userId: number) {
    const cachedOperation = nextCache((postId) => getLikeStatus(postId, userId), ["post-like-status"],
        { tags: [`like-status-${postId}`] })
    return cachedOperation(postId)
}

export default async function PostDetail({ params }: { params: { id: string } }) {
    const id = Number(params.id)
    if (isNaN(id)) {
        return notFound()
    }
    const post = await getCachedPosts(id)
    if (!post) {
        return notFound()
    }

    const session = await getSession()
    const { likeCount, isLiked } = await getCachedLikeStatus(id, session.id!)
    const isOwner = await getIsOwner(post.userId)

    return (
        <div className="p-5 text-white">
            <div className="mb-5 -ml-1">
                <Link href="/posts" className="size-15">
                    <FaRegArrowAltCircleLeft className="size-10" />
                </Link>
            </div>
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
                    <div className="text-xs text-neutral-500">
                        <span>{formatTime(post.created_at.toString())}</span>
                    </div>
                </div>
            </div>
            <h2 className="mt-3 text-lg font-semibold">{post.title}</h2>
            <p className="mb-5">{post.description}</p>
            <div className="float float-right">
                {isOwner?(
                    <EditDeleteButton postId={id} userId={session.id!}/>
                ):null}
            </div>
            <div className="flex flex-col gap-5 items-start">
                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                    <EyeIcon className="size-5" />
                    <span>Views {post.views}</span>
                </div>
                <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
            </div>
            <Comment postId={id} />
            <CommentList postId={id} />
        </div>
    )
}