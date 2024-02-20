'use client'

import { ReactNode, useReducer, useState } from "react"
import { usePathname } from "next/navigation"
import useSWR from "swr"
import { Button, Label, Input, Textarea, useToast } from "@/components/ui"
import { InputAutoComplete, ItemListQuantityInput, DateInput, SelectOptions, type InputAutoCompOpt } from "@/components/my"
import { OrderStatus } from "@/models/modelvar"
import { OrdAct, orderReducer } from "@/utils"
import { Product, OrderFormFields } from "@/types"

type OrderFormProps = {
  orderData?: OrderFormFields,
  submitHandler: (e: React.FormEvent, order: OrderFormFields, callback:()=>void) => void,
  children?: ReactNode,
  loading?: boolean
}

const prodFetcher = async () => {
  const res = await fetch(`/api/products`)
  const data = await res.json()
  return data
}

const options = Object.values(OrderStatus)

const emptyOrder = { name: '', address: '', status:OrderStatus.NEW, account:undefined, items: [], date: undefined, description: '', total: 0 } // default for empty form

export const OrderForm = ({ submitHandler, children, orderData = emptyOrder, loading }: OrderFormProps) => {
  const [orderState, dispatch] = useReducer(orderReducer, orderData)
  const [product, setProduct] = useState<InputAutoCompOpt<Product>|undefined>(undefined)
  const { name, address, account, items, date, description, total, status } = orderState
  const { toast } = useToast()
  
  const path =  usePathname().split('/')
  const newOrder = path[path.length -1] === 'new' ? true : false
  

  // Query available product
  const { data, error, isLoading } = useSWR<Product[]>(`/api/product`, prodFetcher, { revalidateOnFocus: false })
  const prodOptions = data ? data.map(prod => ({ label: prod.name, value: prod })) : []

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    dispatch({ type: OrdAct.NAME, payload: { name } })
  }

  const addressHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const address = e.target.value
    dispatch({ type: OrdAct.ADDRESS, payload: { address } })
  }

  // not going to use this for now
  const accHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const account = undefined //temporarily set to undefined
    dispatch({ type: OrdAct.ACC, payload: { account } })
  }

  const dateHandler = (date: Date | undefined) => {
    if (date) dispatch({ type: OrdAct.DATE, payload: { date } })
  }

  const descChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const desc = e.target.value
    dispatch({ type: OrdAct.DESC, payload: { desc } })
  }
  
  const addItemHandler = () => {
    if (product) {
      if (items.find(item => item.product._id === product.value._id)) {
        const warn = toast({
          description: 'Product already in the list'
        })
        return setTimeout(() => warn.dismiss(), 5000)
      }
      dispatch({ type: OrdAct.ADDITEM, payload: { item: { product: product.value } } })
    }
  }
  
  const remItemHandler = (id: string) => {
    dispatch({ type: OrdAct.REMOVEITEM, payload: { id } })
  }
  
  const quantityChangeHandler = (id: string, quantity: number) => {
    const changedItem = prodOptions.find(prod => prod.value._id === id)
    if (changedItem) {
      dispatch({ type: OrdAct.CHANGEITEM, payload: { item: { product: changedItem.value, quantity: quantity } } })
    }
  }
  
  const statusHandler = (value: string) => {
    dispatch({ type: OrdAct.STATUS, payload: { status:value.toLowerCase() } })
  }
  
  return (
    <form onSubmit={(e) => submitHandler(e, orderState, ()=>dispatch({ type:OrdAct.CLEAR, payload:undefined }))} className="w-full px-4">
      <div className="py-1">
        <Label>Name:</Label>
        <Input type="text" value={name} onChange={nameHandler}/>
      </div>
      <div className="py-1">
        <Label>Address:</Label>
        <Textarea value={address} onChange={addressHandler}/>
      </div>
      <div className="py-1">
        <Label>Items:</Label>
        <div className="flex gap-1">
          {
            !isLoading
              ? (<>
                <InputAutoComplete emptyMessage="No Product Found" options={prodOptions ? prodOptions : []} className="border rounded-md flex-1" placeholder="search product..." onValueChange={setProduct} />
                <Button variant={'secondary'} type='button' className="bg-blue-500 hover:bg-blue-500 text-white disable-active" onClick={addItemHandler}>Add</Button>
              </>)
              : <div className="border rounded-md h-10 w-full bg-gray-200 animate-pulse flex justify-center">
                <div className="my-auto text-sm">Preparing product list, please wait...</div>
              </div>
          }
        </div>
        {items.length > 0 && <ItemListQuantityInput list={items.map(item => ({ id:item.product._id! ?? item.product, name: item.product.name ?? 'undefined', price: item.product.price ?? 'undefined', quantity: item.quantity }))} remove={remItemHandler} quantityChange={quantityChangeHandler} className="py-1"/>}
      </div>
      <div className="flex gap-2">
        <div className="py-1 w-3/5 flex gap-2">
          <Label className="my-auto">Date:</Label>
          <DateInput date={date && new Date(date)} addDate={dateHandler} />
        </div>
        <div className="py-1 w-2/5 flex gap-2 justify-between">
          <Label className="my-auto">Total:</Label>
          <div className="my-auto text-center">RM {total.toFixed(2)}</div>
        </div>
      </div>
      <div className="py-1">
        <Label>Desc</Label>
        <Textarea placeholder="Invoice descriptions" value={description} onChange={descChangeHandler} />
      </div>
      <div className="py-1">
        <Label>Status</Label>
        <SelectOptions options={options} onValueChange={statusHandler} defaultValue={status} disabled={newOrder} className="h-10 w-40"/>
      </div>
      <div className="flex justify-center gap-2 py-1">
        <Button type="submit" disabled={loading}>Submit</Button>
        {children}
      </div>
    </form>
  )
}