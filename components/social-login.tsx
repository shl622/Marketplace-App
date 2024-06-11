import Link from "next/link"
import { ChatBubbleOvalLeftEllipsisIcon} from "@heroicons/react/16/solid"
import { FaInstagram } from "react-icons/fa";

interface SocialLoginProps{

}

export default function SocialLogin(){
    return(
        <>
            <div className="w-full h-px bg-neutral-500"/>
            <div className="flex flex-col gap-3">
                <Link className="primary-btn flex h-10 items-center justify-center gap-3"
                href="/sms">
                    <span><FaInstagram className="h-6 w-6"/></span>
                    <span>Continue with Instagram</span>
                </Link>
                <Link className="primary-btn flex h-10 items-center justify-center gap-3"
                href="/sms">
                    <span><ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6"/></span>
                    <span>Continue with SMS</span>
                </Link>
            </div>
        </>
    )
}