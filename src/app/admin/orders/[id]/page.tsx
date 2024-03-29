'use client'

import { useToast, Button, type Toast } from '@/components/ui'
import type { Order, OrderFormFields } from '@/types'
import { OrderForm, OrderView } from '@/sections/admin'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const orderFetcher = async (url: string) => {
  const res = await fetch(`${url}`)
  const data = await res.json()
  return data
}

const Page = ({ params }: { params: { id: string } }) => {
  // Query order data
  const { data, error, mutate } = useSWR<Order>(`/api/orders/${params.id}`, orderFetcher, { revalidateOnFocus: false, revalidateOnMount: true })
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(false)

  const submitHandler = async (e: React.FormEvent, order: OrderFormFields) => {
    e.preventDefault()
    setLoading(true)

    const { name, address, date, items, status } = order
    let toastObj: Toast = { description: '' } //default toast input
    let emptyFields = []

    // validate for empty fields
    if (name === '') emptyFields.push('Name')
    if (address === '') emptyFields.push('Address')
    if (status === '') emptyFields.push('Status')
    if (items.length === 0) emptyFields.push('Items\' quantity')
    if (!date) emptyFields.push('Date')


    if (emptyFields.length === 0) {

      // submit order here
      const res = await fetch(`/api/orders/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(order)
      })

      if (res.ok) {
        // on success
        toastObj = { description: <div>Order <b>{params.id}</b> has been saved</div>, className: "bg-green-300" }
        setEdit(false)
        setLoading(false)
        // reavalidate order
        mutate(await res.json())
      } else {
        // on failure
        console.log(res)
        const err = await res.json()
        console.log(err)
        const message = err.code === <div>Failed: Order <b>{params.id}</b> failed to be saved</div>
        // display error toast
        toastObj = {
          title: `Error:${err.code}`,
          description: message,
          variant: 'destructive',
        }
      }
    } else {
      //on empty field 
      toastObj = {
        description: (<div>
          <p>Following field&#40;s&#41; is/are required:</p>
          <div className="px-4">
            <ul className="list-disc list-outside">
              {emptyFields.map(field => <li className="font-semibold" key={field}>{field}</li>)}
            </ul>
          </div>
        </div>),
        className: "bg-amber-300"
      }
    }

    const submissionToast = toast(toastObj)
    return setTimeout(() => submissionToast.dismiss(), 3000)
  }

  const deleteOrder = async () => {
    const res = await fetch(`${window.location.origin}/api/orders/${params.id}`,
      { method: 'DELETE' }
    )
    let toastObj: Toast = { description: '' }
    if (res.ok) {
      toastObj = { description: <div>Order <b>{data?._id}</b> has been deleted</div>, className: "bg-green-300" }
      router.push(`${window.location.origin}/admin/orders`)
    } else {
      toastObj = { description: <div>Order <b>{data?._id}</b> failed to be deleted</div>, variant: 'destructive' }
      setLoading(false)
    }
    const deletionToast = toast(toastObj)
    setTimeout(() => deletionToast.dismiss(), 3000)
  }

  const attemptDelete = () => {
    setLoading(true)
    const warningToast = toast({
      title: `Delete Order ${params.id}`,
      description: <div>You are about to delete an order. You will not be able to recover this order once deleted. Are you sure?</div>,
      className: "flex-col gap-3",
      action: <div className="flex justify-center gap-2">
        <Button type="button" className="w-16" onClick={deleteOrder}>Yes</Button>
        <Button type="button" className="w-16" onClick={() => { warningToast.dismiss(); setLoading(false) }}>No</Button>
      </div>
    })
  }

  const content = () => {
    if (data) {
      if (!edit) {
        return (<div className="flex-col w-full">
          <OrderView data={data} >
            <div className="flex justify-center gap-2">
              <Button
                type="button"
                disabled={!!!data || loading}
                className={!!!data || loading ? "disabled:opacity-75" : ''}
                onClick={() => setEdit(true)}
              >
                Edit
              </Button>
              <Button
                type="button"
                onClick={attemptDelete}
                disabled={!!!data || loading}
                className={!!!data || loading ? "disabled:opacity-75" : ''}
              >
                Delete
              </Button>
              <Button
                type="button"
                onClick={() => router.back()}
                disabled={!!!data || loading}
                className={!!!data || loading ? "disabled:opacity-75" : ''}
              >
                Back
              </Button>
            </div>
          </OrderView>
        </div>)
      }
      return (<OrderForm submitHandler={submitHandler} orderData={data} loading={loading} >
        <div className="flex justify-center">
          <Button type="button" onClick={() => setEdit(false)}>Cancel</Button>
        </div>
      </OrderForm>)
    }
    return <div>Loading</div>
  }

  return (
    <div className="flex-col max-w-2xl w-full">
      <div className="pt-5 pb-2 w-full pl-3">
        <h3>Order: {data ? data?.name : <span className="animate-pulse">Loading Order...</span>}</h3>
      </div>
      {content()}
    </div>
  )
}

export default Page