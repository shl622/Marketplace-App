import { notFound } from "next/navigation"
import db from "@/lib/db"
import { redirect } from "next/navigation"
import getSession from "@/lib/session"
import Link from "next/link"
import { formatToUsd } from "@/lib/util"
import Image from "next/image"
import { UserIcon } from "@heroicons/react/24/solid"
import { FaRegArrowAltCircleLeft } from "react-icons/fa"

//function to validate if user viewing is owner or potential buyer
async function getIsOwner(userId: number) {
  const session = await getSession()
  if (session.id) {
    return session.id === userId
  }
  return false
}

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true
        }
      }
    }
  })
  return product
}

export async function generateMetadata({ params,
}: { params: { id: string } }){
  const product = await getProduct(Number(params.id))
  return{
    title: `${product?.title}`
  }
}

export default async function ProductDetail({ params,
}: { params: { id: string } }) {
  //check if string is actually a number
  //prevents user from visiting via route
  const id = Number(params.id)
  if (isNaN(id)) {
    return notFound()
  }
  //check if product actually exists in db or redirect to list
  const product = await getProduct(id)
  if (!product) {
    return redirect("/products")
  }
  const isOwner = await getIsOwner(product.userID)

  //delete product
  async function deleteProduct() {
    "use server"
    await db.product.delete({
      where: {
        id: id
      }
    })
    redirect("/products")
  }

  return (
    <div>
      <div className="flex">
        <Link href="/home" className="size-15 mt-3 mb-3">
          <FaRegArrowAltCircleLeft className="size-10" />
        </Link>
      </div>
      <div className="relative aspect-square">
        <Image className="object-cover" fill src={`${product.photo}/public`} alt={product.title} />
      </div>
      <div className="p-5 mt-auto flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 overflow-hidden rounded-full">
          {product.user.avatar !== null ? (
            <Image
              className="object-cover"
              src={product.user.avatar}
              width={40}
              height={40}
              alt={product.user.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-center items-center space-x-8">
        <span className="font-semibold text-xl">
          ${formatToUsd(product.price)}
        </span>
        <form className="flex gap-2" action={deleteProduct}>
          {isOwner ? (
            <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold
            hover:bg-red-600 transition-all">
              Delete product
            </button>
          ) : null}
          {!isOwner ? (
            <Link
              className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold
            hover:bg-orange-600 transition-all"
              href={``}
            >
              Chat
            </Link>

          ) : null}
        </form>
      </div>
    </div>
  )
}