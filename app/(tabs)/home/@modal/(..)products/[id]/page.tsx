import CloseButton from '@/components/close-button';
import db from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { UserIcon } from '@heroicons/react/24/solid';
import { formatToUsd } from '@/lib/util';
import Link from 'next/link';
import reloadButton from '@/components/reload-button';

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

export default async function Modal({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }

  return (
    <div className='absolute w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-60 left-0 top-0'>
      <div className='max-w-screen-md flex justify-center w-full h-3/4 my-20 rounded-2xl overflow-hidden '>
        <div className='bg-neutral-700 text-neutral-200 flex flex-col justify-between  w-full'>
          <CloseButton />
          <div className='relative h-1/2'>
            <Image
              fill
              src={`${product.photo}/public`}
              alt={product.title}
              className='object-cover'
            />
          </div>
          <div className='p-5 flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <h1 className='text-2xl font-semibold'>{product.title}</h1>
              <p>{product.description}</p>
            </div>
            <div className='flex justify-between border-b border-neutral-700'>
              <div className='flex items-center gap-3 '>
                <div className=' size-10 rounded-full overflow-hidden'>
                  {product.user.avatar !== null ? (
                    <Image
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
              <span className='font-semibold text-xl'>
                ${formatToUsd(product.price)}
              </span>
            </div>
            <div>
              <button className="text-orange-500 hover:text-orange-600 transition-all" onClick={reloadButton}>Visit Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}