import { notFound } from "next/navigation"
import db from "@/lib/db"
import { redirect } from "next/navigation"
import getSession from "@/lib/session"
import Link from "next/link"
import { formatToUsd } from "@/lib/util"
import Image from "next/image"
import { UserIcon } from "@heroicons/react/24/solid"
import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import { unstable_cache as nextCache, revalidatePath, revalidateTag } from "next/cache"

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
      },
    }
  })
  // console.log(product)
  return product
}

//save product and title in cache so it doesn't hit db on every request
const getCachedProduct = nextCache(getProduct, ["product-detail"], {
  tags: ["product-detail"]
})
const getCachedProductTitle = nextCache(getProductTitle, ["product-title"], {
  tags: ["product-title", "product-detail"]
})

async function getProductTitle(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      title: true
    }
  })
  return product
}

export async function generateMetadata({ params,
}: { params: { id: string } }) {
  const product = await getCachedProductTitle(Number(params.id))
  return {
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
  const product = await getCachedProduct(id)
  if (!product) {
    return notFound()
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
    revalidatePath("/home")
    revalidateTag("/product-detail")
    redirect("/home")
  }
  //chat room
  const createChatRoom = async () => {
    "use server";
    const session = await getSession();
    const existRoom = await db.chatRoom.findFirst({
      where: {
        productId: product.id,
        users: {
          some: {
            id: {
              in: [session.id!]
            }
          }
        }
      },
      select: {
        id: true
      }
    })
    if (existRoom) {
      redirect(`/chats/${existRoom.id}`);
    }
    else {
      const room = await db.chatRoom.create({
        data: {
          users: {
            connect: [
              {
                id: product.userID,
              },
              {
                id: session.id,
              },
            ]
          },
          product: {
            connect: {
              id: product.id
            }
          }
        },
        select: {
          id: true,
        },
      });
      redirect(`/chats/${room.id}`);
    }
  };

  //mark product as sold
  //if product status === true: set to false
  //if product status === false: set to true
  //changes the button to set and changes list of products shown on home

  async function soldProduct() {
    "use server"
    if (product!.status) {
      await db.product.update({
        where: {
          id: product?.id
        },
        data: {
          status: false
        }
      })
    }
    else {
      await db.product.update({
        where: {
          id: product!.id
        },
        data: {
          status: true
        }
      })
    }
    revalidatePath("/profile")
    revalidatePath("/home")
    revalidatePath(`/products/${product!.id}`)
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
            <Link
              className="bg-cyan-500 px-5 py-2.5 rounded-md text-white font-semibold
            hover:bg-cyan-600 transition-all"
              href={`/editProduct/${id}/`}
            >
              Edit product
            </Link>

          ) : null}
          {isOwner ? (
            <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold
            hover:bg-red-600 transition-all">
              Delete
            </button>
          ) : null}
        </form>
        {isOwner ? (
          <form action={soldProduct}>
            {product.status === true ? (
              <button className="bg-orange-500 px-3 py-2.5 rounded-md text-white font-semibold
               hover:bg-orange-600 transition-all">
                Mark as sold</button>
            ) : (
              <button className="bg-orange-500 px-3 py-2.5 rounded-md text-white font-semibold
               hover:bg-orange-600 transition-all">
                Mark as Available</button>
            )}
          </form>
        ) : null}
        {!isOwner ? (
          <form action={createChatRoom}>
            <button
              className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold
              hover:bg-orange-600 transition-all"
            >
              Chat
            </button>
          </form>
        ) : null}
      </div>
    </div>
  )
}