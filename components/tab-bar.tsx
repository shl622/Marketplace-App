"use client"

import {
    HomeIcon as SolidHomeIcon,
    ShoppingBagIcon as SolidShopIcon,
    UserCircleIcon as SolidUserIcon,
    ChatBubbleLeftRightIcon as SolidCommIcon,
    EnvelopeIcon as SolidChatIcon
} from "@heroicons/react/24/solid";
import {
    HomeIcon as OutlineHomeIcon,
    ShoppingBagIcon as OutlineShopIcon,
    UserCircleIcon as OutlineUserIcon,
    ChatBubbleLeftRightIcon as OutlineCommIcon,
    EnvelopeIcon as OutlineChatIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function TabBar() {
    const pathname = usePathname()
    return (
        <div className="fixed bottom-0 w-full mx-auto max-w-screen-sm grid grid-cols-5 border-neutral-600 border-t
        px-5 py-3 *:text-white bg-neutral-800">
            <Link href="/home" className="flex flex-col items-center gap-px">
                {pathname === "/home" ? <SolidHomeIcon className="w-7 h-7"/>: <OutlineHomeIcon className="w-7 h-7"/>}
                <span>Home</span>
            </Link>
            <Link href="/posts" className="flex flex-col items-center gap-px">
                {pathname === "/posts" ? <SolidCommIcon className="w-7 h-7"/>: <OutlineCommIcon className="w-7 h-7"/>}
                <span>Community</span>
            </Link>
            <Link href="/chat" className="flex flex-col items-center gap-px">
                {pathname === "/chat" ? <SolidChatIcon className="w-7 h-7"/>: <OutlineChatIcon className="w-7 h-7"/>}
                <span>Chat</span>
            </Link>
            <Link href="/shop" className="flex flex-col items-center gap-px">
                {pathname === "/shop" ? <SolidShopIcon className="w-7 h-7"/>: <OutlineShopIcon className="w-7 h-7"/>}
                <span>Shop</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center gap-px">
                {pathname === "/profile" ? <SolidUserIcon className="w-7 h-7"/>: <OutlineUserIcon className="w-7 h-7"/>}
                <span>Profile</span>
            </Link>
        </div>
    );
}