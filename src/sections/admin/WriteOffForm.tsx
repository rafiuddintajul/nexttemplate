'use client'

import { Button, Label, Input, Textarea } from "@/components/ui"
import { InputAutoComplete, ItemListQuantityInput, DateInput } from "@/components/my"
import { Product, WriteOffFormFields } from "@/types"
import { ReactNode, useReducer, useRef } from "react"
import { useToast } from "@/components/ui"
import useSWR from "swr"
import { WriOfAct, writeOffReducer } from "@/utils"

type WriteOffFormProps = {
  writeOffData?: WriteOffFormFields,
  submitHandler: (e: React.FormEvent, writeOff: WriteOffFormFields, callback:()=>void) => void,
  children?: ReactNode,
  loading?: boolean
}

const prodFetcher = async () => {
  const res = await fetch(`${window.location.origin}/api/products`)
  const data = await res.json()
  return data
}

const emptyWriteOff = { items: [], date: undefined, reason: '', total:0 } // default for empty form

export const WriteOffForm = ({ submitHandler, children, writeOffData = emptyWriteOff, loading }: WriteOffFormProps) => {
  const [writeOffState, dispatch] = useReducer(writeOffReducer, writeOffData)
  const { items, date, reason, total } = writeOffState
  const { toast } = useToast()
  const autoCompleteInputRef = useRef<{ label: string, value: Product, clear?: () => void }>(null)
  // Query available product
  const { data, error, isLoading } = useSWR<Product[]>(`/api/product`, prodFetcher, { revalidateOnFocus: false })
  const prodOptions = data ? data.map(prod => ({ label: prod.name, value: prod })) : []

  const addItemHandler = () => {
    const input = autoCompleteInputRef.current
    if (input?.value) {
      if (items.find(item => item.product._id === input.value._id)) {
        const warn = toast({
          description: 'Product already in the list'
        })
        return setTimeout(() => warn.dismiss(), 5000)
      }
      dispatch({ type: WriOfAct.ADDITEM, payload: { item: { product: input.value } } })
      input.clear?.()
    }
  }

  const remItemHandler = (id: string) => {
    const remItem = prodOptions.find(prod => prod.value._id === id)
    if (remItem) {
      dispatch({ type: WriOfAct.REMOVEITEM, payload: { item: { product: remItem.value } } })
    }
  }

  const quantityChangeHandler = (id: string, quantity: number) => {
    const changedItem = prodOptions.find(prod => prod.value._id === id)
    if (changedItem) {
      dispatch({ type: WriOfAct.CHANGEITEM, payload: { item: { product: changedItem.value, quantity: quantity } } })
    }
  }

  const reasonChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const reason = e.target.value
    dispatch({ type: WriOfAct.REASON, payload: { reason } })
  }

  const dateHandler = (date: Date | undefined) => {
    if (date) dispatch({ type: WriOfAct.DATE, payload: { date } })
  }

  return (
    <form onSubmit={(e) => submitHandler(e, writeOffState, ()=>dispatch({ type:WriOfAct.CLEAR, payload:undefined }))} className="w-full px-4">
      
      <div className="py-1">
        <Label>Items:</Label>
        <div className="flex gap-1">
          {
            !isLoading
              ? (<>
                <InputAutoComplete ref={autoCompleteInputRef} emptyMessage="No Product Found" options={prodOptions ? prodOptions : []} className="border rounded-md flex-1" placeholder="search product..." />
                <Button variant={'secondary'} type='button' className="bg-blue-500 hover:bg-blue-500 text-white disable-active" onClick={addItemHandler}>Add</Button>
              </>)
              : <div className="border rounded-md h-10 w-full bg-gray-200 animate-pulse flex justify-center">
                <div className="my-auto text-sm">Preparing product list, please wait...</div>
              </div>
          }
        </div>
        {items.length > 0 && <ItemListQuantityInput list={items.map((item) => ({ id:item.product._id!, name: item.product.name, price: item.product.price, quantity: item.quantity }))} remove={remItemHandler} quantityChange={quantityChangeHandler} className="py-1" />}
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
        <Label>Reason</Label>
        <Textarea placeholder="Reason of write-off" value={reason} onChange={reasonChangeHandler} />
      </div>
      <div className="flex justify-center gap-2 py-1">
        <Button type="submit" disabled={loading}>Submit</Button>
        {children}
      </div>
    </form>
  )
}