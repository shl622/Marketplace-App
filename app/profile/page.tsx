import db from "@/lib/db"
import getSession from "@/lib/session"
import { notFound, redirect } from "next/navigation"

//testing purposes for session
async function getUser(){
    const session = await getSession()
    if (session.id){
        console.log("1. session id exists")
        const user = await db.user.findUnique({
            where:{
                id: session.id
            }
        })
        if(user){
            console.log("2. user found")
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
        <div>
            <h1>Welcome! {user?.username}!</h1>
            <form action={logOut}>
                <button>Log out</button>
            </form>
        </div>
    )
}