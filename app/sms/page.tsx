"use client"

import Input from "@/components/input"
import Button from "@/components/button"
import { useFormState } from "react-dom"
import { smsVerification } from "./actions"

const initialState = {
    token: false,
    error: undefined
}

export default function smsLogin() {
    const [state, dispatch] = useFormState(smsVerification, initialState)
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">SMS Login</h1>
                <h2 className="text-xl">Verify your phone number</h2>
            </div>
            <form action={dispatch} className="flex flex-col gap-3">
                {state.token ? (
                    <Input
                        key={1}
                        name="token"
                        type="number"
                        placeholder="Verification code"
                        required
                        min={100000}
                        max={999999}
                        errors={state.error?.formErrors}
                    />
                ) : (
                    <Input
                        key={2}
                        name="phoneNumber"
                        type="text"
                        placeholder="Phone number"
                        required
                        errors={state.error?.formErrors}
                    />
                )}
                <Button text={state.token ? "Verify Token" : "Send Verification SMS"} loadMsg="verifying..." />
            </form>
        </div>
    )
}