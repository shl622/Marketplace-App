"use client"

import Link from "next/link"
import { guestLogin } from "./actions"
import { redirect } from "next/navigation"

export default function guestLoginPage() {

    return (
        <div className="flex flex-col items-center gap-3 min-h-screen p-6">
            <div className="flex flex-col gap-3 font-medium align-top">
                <h1>Hello, Guest.</h1>
                <h2>By continuing as guest, you agree to continue as guest and will not be able to use all the functionality.</h2>
                <h2>If you would like to use all the functions, please sign up below!</h2>
            </div>
            <button 
            onClick={async () => {
                await guestLogin()
            }}
            className="primary-btn text-lg py-1.5">Continue as Guest</button>
            <Link href="/create-account" className="primary-btn text-lg py-1.5">
                Create Account
            </Link>
        </div>
    )
}