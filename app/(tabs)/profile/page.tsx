import Image from "next/image"
import { UserIcon } from "@heroicons/react/24/solid"
import { getUser, getUserComments, getUserPosts, getUserProducts, logOut } from "./action"
import ListProduct from "@/components/list-product"
import CommentDropList from "@/components/(profile)/comment-drop"
import PostDropList from "@/components/(profile)/post-drop"


export default async function Profile() {
    const user = await getUser()
    const products = await getUserProducts(user.id)
    const comments = await getUserComments(user.id)
    const posts = await getUserPosts(user.id)
    return (
        <div className="flex flex-col gap-3 p-3 max-h-screen overflow-y-auto">
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
                    <h1>Welcome, {user?.username}!</h1>
                </div>
                <div className="flex flex-col gap-12 justify-between *:text-lg">
                    <h1 className="underline">My Products ({products?.length})</h1>
                    {products?.length !== 0 ? (
                        <div className="flex flex-col gap-5">
                            {products!.map((product) => (
                                <ListProduct key={product.id} {...product} />
                            ))
                            }
                        </div>
                    ) : (
                        <span className="text-sm text-neutral-400 ml-5">
                            No sale available currently.
                        </span>
                    )}
                    <h1 className="underline">My Comments ({comments?.length})</h1>
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
                    <h1 className="underline">My Posts ({posts?.length})</h1>
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
                <form action={logOut} className="w-full">
                    <button className="primary-btn h-10 w-full">Log out</button>
                </form>
            </div>
        </div>
    )
}