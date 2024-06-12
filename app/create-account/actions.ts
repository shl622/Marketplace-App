"use server"
import { z } from "zod"
import {
    passwordMinLength, passwordRegex, passwordRegexError,
    usernameMinError, usernameMinLength,
    usernameMaxError, usernameMaxLength
} from "@/lib/constants"

//password match validation
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
        .trim(),
    email: z.string().email().trim().toLowerCase(),
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
    //pasrse() needs to be try/catch but safeparse just sends
    //flatten allows for an abbreviated 
    const result = formSchema.safeParse(data)
    if (!result.success) {
        return result.error.flatten()
    } else {
        console.log(result.data)
    }
}