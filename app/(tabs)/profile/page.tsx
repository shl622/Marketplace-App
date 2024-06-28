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
        <div className="flex flex-col gap-5 p-5">
            <div className="flex flex-col gap-3">
                <h1>Welcome, {user?.username}!</h1>

                {user.avatar !== null ? (
                    <Image
                        className="size-7 rounded-full"
                        src={user.avatar}
                        width={28}
                        height={28}
                        alt={user.username}
                    />
                ) : (
                    <UserIcon className="size-7 rounded-full" />
                )}

            </div>
            <div className="mt-5">
                <span>Change avatar</span>
            </div>
            <div className="absolute bottom-96">
                <form action={logOut}>
                    <button>Log out</button>
                </form>
            </div>
        </div>
    )
}