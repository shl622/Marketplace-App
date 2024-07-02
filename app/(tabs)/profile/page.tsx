import db from "@/lib/db"
import getSession from "@/lib/session"
import { notFound, redirect } from "next/navigation"
import Image from "next/image"
import { UserIcon } from "@heroicons/react/24/solid"
import { logOut } from "./action"

//testing purposes for session
async function getUser() {
    const session = await getSession()
    if (session.id) {
        const user = await db.user.findUnique({
            where: {
                id: session.id
            }
        })
        if (user) {
            return user
        }
    }
    //if user DNE or no cookie return 404
    notFound()
}

export default async function Profile() {
    const user = await getUser()
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
                <div>
                    <h1>My Products</h1>
                </div>
                <div>
                    <h1>My Comments</h1>
                </div>
                <div>
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