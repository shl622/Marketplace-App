"use client"

import FormInput from "@/components/form-input"
import FormButton from "@/components/form-btn"
import SocialLogin from "@/components/social-login"
import { useFormState } from "react-dom"
import { handleSubmit } from "./actions"

export default function LogIn(){   
    const [state,action] = useFormState(handleSubmit, {
        potato:1
    } as any)
    return(
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">Welcome!</h1>
                <h2 className="text-xl">Login with username and password</h2>
            </div>
            {/* below form uses server actions to handle data */}
            <form action={action} className="flex flex-col gap-3">
                <FormInput
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    errors={[]}
                />
                <FormInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    errors={state?.errors ?? []}
                />
                <FormButton
                text="Login"
                loadMsg="Logging in..."
                />
            </form>
            <SocialLogin/>
        </div>
    )
}