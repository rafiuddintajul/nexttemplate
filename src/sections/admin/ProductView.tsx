import type { Product } from "@/types"
import { Label } from "@/components/ui"
import { PicCarousel } from "@/components/my"

type ProductViewProps = {
  data: Product,
  children: React.ReactNode,
}

export const ProductView = ({ data, children }: ProductViewProps) => {
  const { name, images, price, tags, availability, description } = data
  return (
    <div className="flex-1 flex-col">
      <div className="py-1 flex flex-col h-[450px]">
        <div className="flex-1 w-full flex px-1 justify-center">
          <div className="w-4/5">
            <PicCarousel urls={images} />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="my-auto text-center text-sm">RM {price.toFixed(2)}</div>
      </div>
      <div className="flex justify-center py-2">
        <div className="flex gap-2">
          <Label className="text-sm">Available:</Label>
          <div className="text-sm">{availability ? 'Yes' : 'No'}</div>
        </div>
      </div>
      <div className="py-1 flex justify-center">
        <div className="w-96">
          <Label>Desc</Label>
          <div className="flex justify center">
            <p className="text-sm">{description}</p>
          </div>
          <div className="flex gap-1 mb-3">
            {
              tags.map(tag => <div key={`${name}_${tag}`} className="group/tag border border-gray-400 rounded-sm p-1 opacity-60 text-xs">
                {tag}
              </div>)
            }
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}