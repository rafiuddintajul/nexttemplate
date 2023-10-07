import { Label } from "@/components/ui"
import type { WriteOff } from "@/types"
import format from "date-fns/format"

type WriteOffViewProps = {
  data: WriteOff,
  children?: React.ReactNode
}

export const WriteOffView = ({ data, children }: WriteOffViewProps) => {
  const { items, date, total, reason } = data
  return (
    <div className="w-full px-4">
      <div className="py-1">
        <div className="flex justify-between px-2 pb-1 pt-2 border-b">
          <div className="w-2/4 text-sm">Name</div>
          <div className="w-1/4 text-sm">Price</div>
          <div className="w-12 text-sm">Quantity</div>
        </div>
        {
          items?.map(item => {
            return <div key={`${item._id}`} className="relative flex justify-between p-1">
              <div className="w-2/4 flex gap-2 ">
                <div className="peer flex-1 text-sm my-auto truncate">
                  {item.product.name}
                </div>
                <div className="absolute hidden peer-hover:block peer-active:block bottom-8 left-5 text-sm bg-black text-white rounded-md p-1 w-fit">
                  {item.product.name}
                </div>
              </div>
              <div className="w-1/4 flex">
                <div className="text-sm my-auto">RM{item.product.price.toFixed(2)}</div>
              </div>
              <div className="w-12">
                <div className="text-sm text-center p-1">{item.quantity}</div>
              </div>
            </div>
          })
        }
      </div>
      <div className="flex gap-2 px-1">
        <div className="py-1 w-3/5 flex gap-2">
          <Label className="my-auto">Date:</Label>
          <div className="text-sm">{format(new Date(date), "PPP")}</div>
        </div>
        <div className="py-1 w-2/5 flex gap-2 justify-end">
          <Label className="my-auto">Total:</Label>
          <div className="my-auto text-center text-sm">{total.toFixed(2)}</div>
        </div>
      </div>
      <div className="py-1">
        <Label>Desc</Label>
        <div className="text-sm">{reason}</div>
      </div>
      {children}
    </div>
  )
}