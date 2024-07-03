import db from "@/lib/db"
import getSession from "@/lib/session"
import { notFound, redirect } from "next/navigation"
import Image from "next/image"
import { UserIcon } from "@heroicons/react/24/solid"
import { getUser, getUserComments, getUserProducts, logOut } from "./action"
import ListProduct from "@/components/list-product"
import CommentDropList from "@/components/(profile)/comment-drop"


export default async function Profile() {
    const user = await getUser()
    const products = await getUserProducts(user.id)
    const comments = await getUserComments(user.id)
    return (
        <div className="flex flex-col gap-8 p-5 justify-between">
            <div>
                <div className="flex flex-col gap-5 items-center">
                    <h1>Welcome, {user?.username}!</h1>
                    {user.avatar !== null ? (
                        <Image
                            className="size-28 rounded-full"
                            src={user.avatar}
                            width={100}
                            height={100}
                            alt={user.username}
                        />
                    ) : (
                        <UserIcon className="size-28 rounded-full" />
                    )}

                </div>
                <div className="flex flex-col gap-12 mt-16 justify-between *:text-lg">
                    <h1>My Products</h1>
                    {products?.length !== 0 ? (
                        <div className="p-5 flex flex-col gap-5">
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
                    <h1>My Comments</h1>
                        {comments?.length !== 0 ? (
                            <div>
                                {comments!.map((comment)=>(
                                    <CommentDropList key={comment.id} {...comment}/>
                                ))}
                            </div>
                        ):(
                           <span className="text-sm text-neutral-400 ml-5">
                            No comments have been made yet.
                           </span>
                        )}
                    <h1>My Posts</h1>
                </div>
            </div>
            <div className="flex flex-col mt-96 items-center w-full">
                <form action={logOut} className="w-full">
                    <button className="primary-btn h-10 w-full">Log out</button>
                </form>
            </div>
        </div>
    )
}