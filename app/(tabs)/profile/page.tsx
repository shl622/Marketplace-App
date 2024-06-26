import db from "@/lib/db"
import getSession from "@/lib/session"
import { notFound, redirect } from "next/navigation"
import Image from "next/image"
import { UserIcon } from "@heroicons/react/24/solid"

//testing purposes for session
async function getUser(){
    const session = await getSession()
    if (session.id){
        const user = await db.user.findUnique({
            where:{
                id: session.id
            }
        })
        if(user){
            return user
        }
    }
    //if user DNE or no cookie return 404
    notFound()
}

export default async function Profile(){
    const user = await getUser()
    const logOut = async () =>{
        "use server";
        const session = await getSession()
        await session.destroy();
        redirect("/")
    }
    return(
        <div className="flex flex-col gap-5 p-5">
            <h1>Welcome, {user?.username}!</h1>
            <div>
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
            <form action={logOut}>
                <button>Log out</button>
            </form>
        </div>
    )
}