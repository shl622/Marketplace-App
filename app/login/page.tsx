"use client"

import Input from "@/components/input"
import Button from "@/components/button"
import SocialLogin from "@/components/social-login"
import { useFormState } from "react-dom"
import { login } from "./actions"

export default function LogIn() {
    const [state, dispatch] = useFormState(login, null)
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">Welcome!</h1>
                <h2 className="text-xl">Login with username and password</h2>
            </div>
            {/* below form uses server actions to handle data */}
            <form action={dispatch} className="flex flex-col gap-3">
                <Input
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    errors={state?.fieldErrors.username}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    errors={state?.fieldErrors.password}
                />
                <Button
                    text="Login"
                    loadMsg="Logging in..."
                />
            </form>
            <SocialLogin
                category="Log in" />
        </div>
    )
}