import { Input } from "../ui"
import { forwardRef } from "react"
import { X } from "lucide-react"

export type Item = {
  id: string,
  name: string,
  price?:number,
  quantity:number
}

type ItemListQuantityInputProps = {
  list: Item[],
  remove: (id: string) => void,
  quantityChange?: (id:string, quantity:number) => void,
} & React.HTMLAttributes<HTMLDivElement>

export const ItemListQuantityInput = forwardRef(({ list, remove, quantityChange, ...props }: ItemListQuantityInputProps, ref:any) => {

  const inputChangeHandler = (id:string, e:React.ChangeEvent) => {
    const input = e.currentTarget as HTMLInputElement
    const quantity = Number(input.value)
    if (quantityChange && !isNaN(quantity)) {
      quantityChange(id, quantity)
    }
  }
  return (
    <div className={`flex-col ${props.className}`} ref={ref}>
      <div className="flex justify-between px-2 pb-1 pt-2 border-b">
        <div className="w-2/4 text-sm">Name</div>
        <div className="w-1/4 text-sm">Price</div>
        <div className="w-12 text-sm">Quantity</div>
      </div>
      {
        list?.map((item: Item, index: number) => {
          return <div key={`items_${index}`} className="relative flex justify-between p-1">
            <div className="w-2/4 flex gap-2 ">
              <div className="flex-none flex items-center">
                <div className="my-auto border rounded-full w-5 h-5 flex items-center hover:cursor-pointer" onClick={() => remove(item.id)}>
                  <X size={12} className="mx-auto" />
                </div>
              </div>
              <div className="peer flex-1 text-sm my-auto truncate">
                {item.name}
              </div>
              <div className="absolute hidden peer-hover:block peer-active:block bottom-8 left-5 text-sm bg-black text-white rounded-md p-1 w-fit">{item.name}</div>
            </div>
            {
              item.price && (
                <div className="w-1/4 flex">
                  <div className="text-sm my-auto">RM{item.price}</div>
                </div>
              )
            }
            <div className="w-12">
              <Input ref={ref} className="text-sm text-center p-1" type="number" onChange={(e)=>inputChangeHandler(item.id,e)} value={item.quantity||0} />
            </div>
          </div>
        })
      }
    </div>
  )
})