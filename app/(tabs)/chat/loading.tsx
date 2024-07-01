export default function Loading() {
    return (
        <div className="animate-pulse flex flex-col gap-5">
            {[...Array(10)].map((index) => (
                <div key={index} className="flex p-5 gap-5 animate-pulse">
                    <div className="size-14 bg-neutral-700 rounded-full" />
                    <div className="flex flex-col gap-2 *:rounded-md">
                        <div className="bg-neutral-700 h-14 w-96" />
                    </div>
                </div>
            ))}
        </div>
    )
}