"use server"
import { z } from "zod"
import {
    passwordMinLength, passwordRegex, passwordRegexError,
    usernameMinError, usernameMinLength,
    usernameMaxError, usernameMaxLength
} from "@/lib/constants"
import db from "@/lib/db"
import bcrypt from "bcrypt"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import getSession from "@/lib/session"

//check if username is unique
const checkUniqueUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username
        },
        select: {
            id: true
        }
    })
    return !Boolean(user)
}

//check if email is unique
const checkUniqueEmail = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email
        },
        select: {
            id: true
        }
    })
    return Boolean(user) === false
}

//password and confirm_pw match validation
const checkPassword = ({ password, confirm_password }: { password: string, confirm_password: string }) =>
    password === confirm_password

//schema "requires" fields-- put .optional() to make opt
const formSchema = z.object({
    username: z.string({
        invalid_type_error: "Username must be a string",
        required_error: "Username is required."
    }).min(usernameMinLength, usernameMinError)
        .max(usernameMaxLength, usernameMaxError)
        .toLowerCase()
        .trim()
        .refine(checkUniqueUsername, "Username already exists!"),
    email: z.string()
        .email()
        .trim()
        .toLowerCase()
        .refine(checkUniqueEmail, "Email already exists!"),
    password: z.string().min(passwordMinLength).regex(passwordRegex, passwordRegexError),
    confirm_password: z.string().min(passwordMinLength),
}).refine(checkPassword, {
    message: "Password does not match.",
    //need to set path to tell zod which field this error belongs to
    path: ["confirm_password"],
})

export async function initAccount(prevState: any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password")
    }
    //safeParseAsync() to make zod use "await" for all verification that are async
    // can use spa = safeParseAsync()
    //flatten allows for an abbreviated 
    const result = await formSchema.safeParseAsync(data)
    if (!result.success) {
        return result.error.flatten()
    } else {
        // bcrypt.hash (hash_target,# of rounds)
        const hashedPassword = await bcrypt.hash(result.data.password, 12)
        const user = await db.user.create({
            data: {
                username: result.data.username,
                email: result.data.email,
                password: hashedPassword,
            },
            select: {
                id: true
            }
        })
        //log in user-- use cookies and encrypt/decrypt
        //https://www.npmjs.com/package/iron-session?activeTab=readme
        const session = await getSession()
        session.id = user.id;
        await session.save()
        // redirect to home
    }

}

