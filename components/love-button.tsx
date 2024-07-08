"use client"

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlinedHeartIcon } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";
import { disloveProduct, loveProduct } from "@/app/(tabs)/home/@modal/(..)products/[id]/action";


interface LoveButtonProps {
    isLoved: boolean
    loveCount: number
    productId: number
}

export default function LoveButton({ isLoved, loveCount, productId }: LoveButtonProps) {
    //useOptimistic(1st arg: what shows to user first, reducer function)
    const [state, reducerFn] = useOptimistic({ isLoved, loveCount }, (previousState) => ({
        isLoved: !previousState.isLoved,
        loveCount: previousState.isLoved
            ? previousState.loveCount - 1
            : previousState.loveCount + 1
    })
    )
    const onClick = async () => {
        reducerFn(undefined)
        if (isLoved) {
            await disloveProduct(productId)
        } else {
            await loveProduct(productId)
        }
    }
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 hover:bg-neutral-800 transition-colors
                            ${state.isLoved ? "bg-orange-500 text-white border-orange-500" : ""}`}
        >
            {state.isLoved ? (<HeartIcon className="size-5" />)
                : (<OutlinedHeartIcon className="size-5" />)}
            {state.isLoved ? (<span>{state.loveCount}</span>) :
                (<span>Like ({state.loveCount})</span>)}
        </button>
    )
}