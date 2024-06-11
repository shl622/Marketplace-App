"use client"

import FormInput from "@/components/form-input"
import FormButton from "@/components/form-btn"
import SocialLogin from "@/components/social-login"
import { useFormState } from "react-dom"
import { initAccount } from "./actions"

export default function createAccount(){
    //action = {action}
    const [state,dispatch] = useFormState(initAccount,null)
    return(
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">Welcome!</h1>
                <h2 className="text-xl">Fill in below</h2>
            </div>
            <form action={dispatch} className="flex flex-col gap-3">
                <FormInput
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    errors={state?.fieldErrors.username}
                />
                <FormInput
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    errors={state?.fieldErrors.email}
                />
                <FormInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    errors={state?.fieldErrors.password}
                />
                <FormInput
                    name="confirm_password"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    errors={state?.fieldErrors.confirm_password}
                />
                <FormButton
                    text="Create account"
                    loadMsg="Creating account..."
                />
            </form>
            <SocialLogin/>
        </div>
    )
}