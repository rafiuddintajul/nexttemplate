import { Product } from "@/types"
import { PicCarousel } from "./PicCarousel"

type ProductProfileProps = {
  data: Product
  tagHandler?: (e: React.MouseEvent<HTMLDivElement>) => void
  redirectProduct?: (e:React.MouseEvent, id?:string) => void
}

export const ProductProfileSm = ({ data, tagHandler, redirectProduct }: ProductProfileProps) => {
  const { _id, name, images, price, tags, description } = data
  return (
    <div className="group/product w-full border rounded-lg p-2 mb-2 bg-gray-100 h-[12rem] flex gap-2 active:ring active:ring-blue-300" onClick={(e)=>redirectProduct?.(e,_id)}>
      <div className="w-1/2 md:w-2/5 flex-none">
        <PicCarousel urls={images} />
      </div>
      <div className="flex-1">
        <div className="flex-col">
          <h3 className="mb-2 truncate">{name}</h3>
          <div className="mb-1 text-sm">RM {price.toFixed(2)}</div>
          <div className="mb-1 text-xs flex gap-1">{tags.map(tag => {
            return <div key={`${name}_${tag}`} className="group/tag border border-gray-400 rounded-sm p-1 opacity-60" onClick={tagHandler}>
                {tag}
            </div>
          })}</div>
          <div className="text-sm line-clamp-3">{description}</div>
        </div>
      </div>
    </div>
  )
}