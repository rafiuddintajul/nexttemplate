'use client'

import Image from "next/image"
import type {Product} from "@/types"

type ProductCardProps = {
  data: Product,
  children?: React.ReactNode
}

export const ProductCard = ({ data, children }: ProductCardProps) => {

  const stockLeft = data.stock ? data.stock > 1 ? `${data.stock} units left` : `1 unit left` : ''

  return (
    <div className="h-full py-7 max-w-sm flex flex-col justify-center mx-auto">
      <div className="h-full flex flex-col border rounded-xl shadow-md mx-1 py-4">
        <div className="flex-initial " style={{ height: "420px" }}>
          <div className="h-full relative px-6 py-2 overflow-hidden">
            <Image src={data.images[0]} fill alt={data.name} className="h-full px-3" />
          </div>
        </div>
        <div className="flex-1 items-center">
          <div className="h-full grid grid-cols-1 content-center">
            <h3 className="py-2 text-center font-serif font-semibold underline decoration-1 underline-offset-8">{data.name}</h3>
            <p className="text-center px-2 line-clamp-1">{data.description}</p>
            <p className="text-center">RM {data.price}</p>
            {children}
            <p className="text-gray-500 text-xs text-center pt-1">{stockLeft}</p>
          </div>
        </div>
      </div>
    </div>
  )
}