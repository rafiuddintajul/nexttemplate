import { Label } from "@/components/ui"
import type { Order, ItemGroup } from "@/types"
import format from "date-fns/format"

type OrderViewProps = {
  data: Order,
  children: React.ReactNode,
}

export const OrderView = ({ data, children }: OrderViewProps) => {
  const { account, address, items, date, total, description, status } = data
  const dispAcc = account?.user?.name
  const green = status === 'new' ? 'text-green-500' : ''
  return (
    <div className="w-full px-4">
      <div className="py-1">
        <div className="py-1">
          <Label>Address</Label>
          <div className="text-sm">{address}</div>
        </div>
        <div className="py-1 flex justify-between">
          <div>
            <Label>Account</Label>
            <div className="text-sm">{dispAcc ?? 'Unregistered'}</div>
          </div>
          <div>
            <Label>Status</Label>
            <div className={`text-sm text-center font-bold ${green}`}>{status.toUpperCase()}</div>
          </div>
        </div>
        <div className="flex justify-between px-2 pb-1 pt-2 border-b">
          <div className="w-2/4 text-sm">Name</div>
          <div className="w-1/4 text-sm">Price</div>
          <div className="w-12 text-sm">Quantity</div>
        </div>
        {
          items?.map((item: ItemGroup) => {
            return <div key={`${item._id}`} className="relative flex justify-between p-1">
              <div className="w-2/4 flex gap-2 ">
                <div className="peer flex-1 text-sm my-auto truncate">
                  {item.product.name ?? "undefined"}
                </div>
                <div className="absolute hidden peer-hover:block peer-active:block bottom-8 left-5 text-sm bg-black text-white rounded-md p-1 w-fit">
                  {item.product.name ?? "undefined"}
                </div>
              </div>
              <div className="w-1/4 flex">
                <div className="text-sm my-auto">RM{item.product.price?.toFixed(2) ?? "undefined"}</div>
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
          <div className="my-auto text-center text-sm">RM {total.toFixed(2)}</div>
        </div>
      </div>
      <div className="py-1">
        <Label>Desc</Label>
        <div className="text-sm">{description}</div>
      </div>
      {children}
    </div>
  )
}