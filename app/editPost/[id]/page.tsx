import { notFound } from "next/navigation";
import getOriginalPost, { getIsOwner } from "./action";
import EditPost from "@/components/edit-post-form";

export default async function editPost({ params
}: { params: { id: string } }) {
    const id = Number(params.id)
    const post = await getOriginalPost(id)
    const isOwner = await getIsOwner(post.userId)
    if (!isOwner){
        return notFound()
    }
    return (
        <EditPost {...post}/>
    )
}

