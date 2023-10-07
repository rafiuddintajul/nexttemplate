'use client'

import { ReactNode, useReducer, useState } from "react"
import useSWR from "swr"
import { Button, Label, Input, Textarea, useToast } from "@/components/ui"
import { InputAutoComplete, ItemListQuantityInput, DateInput, type InputAutoCompOpt } from "@/components/my"
import { InvAct, invoiceReducer, } from "@/utils"
import { Product, InvoiceFormFields } from "@/types"

type InvoiceFormProps = {
  invoiceData?: InvoiceFormFields,
  submitHandler: (e: React.FormEvent, invoice: InvoiceFormFields, callback:()=>void) => void,
  children?: ReactNode,
  loading?: boolean
}

const prodFetcher = async () => {
  const res = await fetch(`${window.location.origin}/api/products`)
  const data = await res.json()
  return data
}

const emptyInvoice = { no: '', items: [], date: undefined, desc: '', total: 0 } // default for empty form

export const InvoiceForm = ({ submitHandler, children, invoiceData = emptyInvoice, loading }: InvoiceFormProps) => {
  const [invoiceState, dispatch] = useReducer(invoiceReducer, invoiceData)
  const [product, setProduct] = useState<InputAutoCompOpt<Product>|undefined>(undefined)
  const { no, items, date, desc, total } = invoiceState
  const { toast } = useToast()

  // Query available product
  const { data, error, isLoading } = useSWR<Product[]>(`/api/product`, prodFetcher, { revalidateOnFocus: false })
  const prodOptions = data ? data.map(prod => ({ label: prod.name, value: prod })) : []

  const invoiceNoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const no = e.target.value
    dispatch({ type: InvAct.INVOICENO, payload: { no } })
  }

  const addItemHandler = () => {
    if (product) {
      if (items.find(item => item.product._id === product.value._id)) {
        const warn = toast({
          description: 'Product already in the list'
        })
        return setTimeout(() => warn.dismiss(), 5000)
      }
      dispatch({ type: InvAct.ADDITEM, payload: { item: { product: product.value } } })
    }
  }

  const remItemHandler = (id: string) => {
    const remItem = prodOptions.find(prod => prod.value._id === id)
    if (remItem) {
      dispatch({ type: InvAct.REMOVEITEM, payload: { item: { product: remItem.value } } })
    }
  }

  const quantityChangeHandler = (id: string, quantity: number) => {
    const changedItem = prodOptions.find(prod => prod.value._id === id)
    if (changedItem) {
      dispatch({ type: InvAct.CHANGEITEM, payload: { item: { product: changedItem.value, quantity: quantity } } })
    }
  }

  const descChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const desc = e.target.value
    dispatch({ type: InvAct.DESC, payload: { desc } })
  }

  const dateHandler = (date: Date | undefined) => {
    if (date) dispatch({ type: InvAct.DATE, payload: { date } })
  }

  return (
    <form onSubmit={(e) => submitHandler(e, invoiceState, ()=>dispatch({ type:InvAct.CLEAR, payload:undefined }))} className="w-full px-4">
      <div className="py-1">
        <Label>Invoice No:</Label>
        <Input type="text" value={no} onChange={invoiceNoHandler} />
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
        {items.length > 0 && <ItemListQuantityInput list={items.map(item => ({ id:item.product._id!, name: item.product.name, price: item.product.price, quantity: item.quantity }))} remove={remItemHandler} quantityChange={quantityChangeHandler} className="py-1" />}
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
        <Textarea placeholder="Invoice descriptions" value={desc} onChange={descChangeHandler} />
      </div>
      <div className="flex justify-center gap-2 py-1">
        <Button type="submit" disabled={loading}>Submit</Button>
        {children}
      </div>
    </form>
  )
}