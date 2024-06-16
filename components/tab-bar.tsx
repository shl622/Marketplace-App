"use client"

import {
    HomeIcon as SolidHomeIcon,
    ShoppingBagIcon as SolidShopIcon,
    UserCircleIcon as SolidUserIcon,
    MapPinIcon as SolidMapIcon,
    ChatBubbleLeftRightIcon as SolidChatIcon
} from "@heroicons/react/24/solid";
import {
    HomeIcon as OutlineHomeIcon,
    ShoppingBagIcon as OutlineShopIcon,
    UserCircleIcon as OutlineUserIcon,
    MapPinIcon as OutlineMapIcon,
    ChatBubbleLeftRightIcon as OutlineChatIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function TabBar() {
    const pathname = usePathname()
    return (
        <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t
        px-5 py-3 *:text-white bg-neutral-800">
            <Link href="/products" className="flex flex-col items-center gap-px">
                {pathname === "/products" ? <SolidHomeIcon className="w-7 h-7"/>: <OutlineHomeIcon className="w-7 h-7"/>}
                <span>Home</span>
            </Link>
            <Link href="/life" className="flex flex-col items-center gap-px">
                {pathname === "/life" ? <SolidMapIcon className="w-7 h-7"/>: <OutlineMapIcon className="w-7 h-7"/>}
                <span>Nearby</span>
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