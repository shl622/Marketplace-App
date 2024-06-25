import { unstable_cache as nextCache } from "next/cache";
import getOriginalPost, { updatePost } from "./action";
import EditPost from "@/components/edit-post-form";
import Link from "next/link";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import Button from "@/components/button";
import { useFormState } from "react-dom";
import Input from "@/components/input";


export default async function editPost({ params
}: { params: { id: string } }) {
    const id = Number(params.id)
    const post = await getOriginalPost(id)
    return (
        <EditPost {...post}/>
    )
}

