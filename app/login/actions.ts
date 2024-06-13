"use server"

import { z } from "zod";
import db from "@/lib/db";
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/userAuth/verifySession";

//check if username exists
const checkUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
        }
    })
    return Boolean(user)
}

const formSchema = z.object({
    username: z.string().trim().toLowerCase().refine(
        checkUsername, "Username does not exist"
    ),
    password: z.string(
        { required_error: "Password is required" }
    )
})

export async function login(prevState: any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        password: formData.get("password")
    }
    const result = await formSchema.safeParseAsync(data)
    if (!result.success) {
        return result.error.flatten()
    } else {
        //find a user with the username and check password hash
        const user = await db.user.findUnique({
            where: {
                username: result.data.username
            },
            select: {
                id: true,
                password: true
            }
        })
        if (!user) {
            return {
                fieldErrors: {
                    username: ["Incorrect username or password."]
                }
            }
        }
        //second argument --> if user doesn't send information
        const verified = await bcrypt.compare(result.data.password, user!.password ?? "xxxx")
        if (verified) {
            verifySession(user.id)
            redirect("/profile")
        } else {
            return {
                fieldErrors: {
                    password: ["Incorrect username or password."]
                }
            }
        }
    }
}