"use server"

import { passwordMinLength, passwordRegex, passwordRegexError } from "@/lib/constants";
import { z } from "zod";

const formSchema = z.object({
    username: z.string().trim().toLowerCase().min(3),
    password: z.string(
        { required_error: "Password is required" }
    ).min(passwordMinLength).regex(passwordRegex, passwordRegexError)
})

export async function login(prevState: any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        password: formData.get("password")
    }
    const result = formSchema.safeParse(data)
    if (!result.success) {
        console.log(result.error.flatten())
        return result.error.flatten()
    } else {
        console.log(result.data)
    }
}