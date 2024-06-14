import Link from "next/link"
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/16/solid"
import { FaGithub, FaGoogle } from "react-icons/fa";

interface SocialLoginProps {
    category: string
}

export default function SocialLogin({ category }: SocialLoginProps) {
    return (
        <>
            <div className="w-full h-px bg-neutral-500" />
            <div className="flex flex-col gap-3">
                <Link className="primary-btn flex h-10 items-center justify-center gap-3"
                    href="/github/start">
                    <span><FaGithub className="h-6 w-6" /></span>
                    <span>{category} with GitHub</span>
                </Link>
                <Link className="primary-btn flex h-10 items-center justify-center gap-3"
                    href="/google/start">
                    <span><FaGoogle className="h-6 w-6" /></span>
                    <span>{category} with Google</span>
                </Link>
                <Link className="primary-btn flex h-10 items-center justify-center gap-3"
                    href="/sms">
                    <span><ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" /></span>
                    <span>{category} with SMS</span>
                </Link>
            </div>
        </>
    )
}