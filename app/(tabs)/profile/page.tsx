import Image from "next/image"
import { UserIcon } from "@heroicons/react/24/solid"
import { getUser, getUserComments, getUserLiveProducts, getUserPosts, getUserSoldProducts, logOut } from "./action"
import ListProduct from "@/components/list-product"
import CommentDropList from "@/components/(profile)/comment-drop"
import PostDropList from "@/components/(profile)/post-drop"
import ListSoldProduct from "@/components/list-soldproduct"

export const metadata = {
    title: "My Profile",
}

export default async function Profile() {
    const user = await getUser()
    const liveProducts = await getUserLiveProducts(user.id)
    const soldProducts = await getUserSoldProducts(user.id)
    const comments = await getUserComments(user.id)
    const posts = await getUserPosts(user.id)
    return (
        <div className="flex flex-col gap-3 p-8">
            <div>
                <div className="flex gap-5 items-center mb-5">
                    {user.avatar !== null ? (
                        <Image
                            className="size-12 rounded-full"
                            src={user.avatar}
                            width={100}
                            height={100}
                            alt={user.username}
                        />
                    ) : (
                        <UserIcon className="size-12 rounded-full" />
                    )}
                    <h1 className="text-2xl">Welcome, {user?.username}!</h1>
                </div>
                <div className="flex flex-col gap-12 justify-between *:text-2xl">
                    <div className="flex gap-2">
                        <h1 className="font-bold">Live Products</h1>
                        <span className="flex items-center justify-center size-8 bg-orange-500 rounded-full
                        text-lg">
                            {liveProducts?.length}</span>
                    </div>
                    
                    {liveProducts?.length !== 0 ? (
                        <div className="flex flex-col gap-5">
                            {liveProducts!.map((product) => (
                                <ListProduct key={product.id} {...product} />
                            ))
                            }
                        </div>
                    ) : (
                        <span className="text-sm text-neutral-400 ml-5">
                            No sale available currently.
                        </span>
                    )}
                    <div className="flex gap-2">
                        <h1 className="font-bold">Sold Products</h1>
                        <span className="flex items-center justify-center size-8 bg-orange-500 rounded-full
                        text-lg">
                            {soldProducts?.length}</span>
                    </div>
                    
                    {soldProducts?.length !== 0 ? (
                        <div className="flex flex-col gap-5">
                            {soldProducts!.map((product) => (
                                <ListSoldProduct key={product.id} {...product} />
                            ))
                            }
                        </div>
                    ) : (
                        <span className="text-sm text-neutral-400 ml-5">
                            No sold items available currently.
                        </span>
                    )}
                    <div className="flex gap-2">
                        <h1 className="font-bold">My Comments</h1>
                        <span className="flex items-center justify-center size-8 bg-orange-500 rounded-full
                        text-lg">
                            {comments?.length}</span>
                    </div>
                        {comments?.length !== 0 ? (
                            <div className="flex flex-col gap-5">
                                {comments!.map((comment)=>(
                                    <CommentDropList key={comment.id} {...comment}/>
                                ))}
                            </div>
                        ):(
                           <span className="text-sm text-neutral-400 ml-5">
                            No comments have been made yet.
                           </span>
                        )}
                    <div className="flex gap-2">
                        <h1 className="font-bold">My Posts</h1>
                        <span className="flex items-center justify-center size-8 bg-orange-500 rounded-full
                        text-lg">
                            {posts?.length}</span>
                    </div>
                        {posts?.length !== 0 ? (
                            <div className="flex flex-col gap-5">
                                {posts!.map((post)=>(
                                    <PostDropList key={post.id} {...post}/>
                                ))}
                            </div>
                        ):(
                            <span className="text-sm text-neutral-400 ml-5">
                            No posts have been made yet.
                           </span>
                        )}
                </div>
            </div>
            <div>
                <form action={logOut} className="mt-10 w-full">
                    <button className="primary-btn h-10 w-full">Log out</button>
                </form>
            </div>
        </div>
    )
}