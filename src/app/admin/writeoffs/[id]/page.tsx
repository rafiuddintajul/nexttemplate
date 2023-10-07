'use client'

import { useToast, Button, type Toast } from '@/components/ui'
import type { WriteOff, WriteOffFormFields } from '@/types'
import { WriteOffForm, WriteOffView } from '@/sections/admin'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const orderFetcher = async (url: string) => {
  const res = await fetch(`${window.location.origin}${url}`)
  const data = await res.json()
  return data
}

const Page = ({ params }: { params: { id: string } }) => {
  // Query order data
  const { data, error, mutate } = useSWR<WriteOff>(`/api/writeoffs/${params.id}`, orderFetcher, { revalidateOnFocus: false, revalidateOnMount: true })
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(false)

  const submitHandler = async (e: React.FormEvent, writeoff: WriteOffFormFields) => {
    e.preventDefault()
    setLoading(true)

    const { date, items, reason } = writeoff
    let toastObj: Toast = { description: '' } //default toast input
    let emptyFields = []

    // validate for empty fields   
    if (items.length === 0) emptyFields.push('Items\' quantity')
    if (!date) emptyFields.push('Date')
    if (!reason) emptyFields.push('Reason')

    if (emptyFields.length === 0) {

      // submit order here
      const res = await fetch(`${window.location.origin}/api/writeoffs/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(writeoff)
      })

      if (res.ok) {
        // on success
        toastObj = { description: <div>Write-off <b>{params.id}</b> has been saved</div>, className: "bg-green-300" }
        setEdit(false)
        setLoading(false)
        // reavalidate order
        mutate(await res.json())
      } else {
        // on failure
        const err = await res.json()
        console.log(err)
        const message = err.code === <div>Failed: Write-off <b>{params.id}</b> failed to be saved</div>
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
    const res = await fetch(`${window.location.origin}/api/writeoffs/${params.id}`,
      { method: 'DELETE' }
    )
    let toastObj: Toast = { description: '' }
    if (res.ok) {
      toastObj = { description: <div>Write-off <b>{data?._id}</b> has been deleted</div>, className: "bg-green-300" }
      router.push(`${window.location.origin}/admin/writeoffs`)
    } else {
      toastObj = { description: <div>Write-off <b>{data?._id}</b> failed to be deleted</div>, variant: 'destructive' }
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
        <Button type="button" className="w-16" onClick={() => {warningToast.dismiss(); setLoading(false);}}>No</Button>
      </div>
    })
  }

  const content = () => {
    if (data) {
      if (!edit) {
        return (<div className="flex-col w-full">
          <WriteOffView data={data} >
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
          </WriteOffView>
        </div>)
      } 
      return (<WriteOffForm submitHandler={submitHandler} writeOffData={data} loading={loading} >
        <div className="flex justify-center">
          <Button type="button" onClick={() => setEdit(false)}>Cancel</Button>
        </div>
      </WriteOffForm>)
    }
    return <div>Loading</div>
  }

  return (
    <section className="flex flex-1 flex-col justify-center">
      <div className="flex-col max-w-2xl w-full">
        <div className="pt-5 pb-2 w-full pl-3">
          <h3>Order: {data ? data?._id : <span className="animate-pulse">Loading Order...</span>}</h3>
        </div>
        {content()}
      </div>
    </section>
  )
}

export default Page