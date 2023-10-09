'use client'

import { useToast, Button, type Toast } from '@/components/ui'
import type { Invoice, InvoiceFormFields } from '@/types'
import { InvoiceForm, InvoiceView } from '@/sections/admin'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const invoiceFetcher = async (url: string) => {
  const res = await fetch(`${window.location.origin}${url}`)
  const data = await res.json()
  return data
}

const Page = ({ params }: { params: { id: string } }) => {
  // Query invoice data
  const { data, error, mutate } = useSWR<Invoice>(`/api/invoices/${params.id}`, invoiceFetcher, { revalidateOnFocus: false, revalidateOnMount: true })
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(false)

  const submitHandler = async (e: React.FormEvent, invoice: InvoiceFormFields) => {
    e.preventDefault()
    setLoading(true)

    const { no, date, items } = invoice
    let toastObj: Toast = { description: '' } //default toast input
    let emptyFields = []

    // validate for empty fields
    if (no === '') emptyFields.push('Invoice No')
    if (items.length === 0) emptyFields.push('Items\' quantity')
    if (!date) emptyFields.push('Date')

    if (emptyFields.length === 0) {
      // submit invoice here
      const res = await fetch(`${window.location.origin}/api/invoices/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(invoice)
      })

      if (res.ok) {
        // on success
        toastObj = { description: <div>Invoice <b>{no}</b> has been saved</div>, className: "bg-green-300" }
        setEdit(false)
        setLoading(false)
        // reavalidate invoice
        mutate(await res.json())
      } else {
        // on failure
        const err = await res.json()
        console.log(err)
        const message = err.code === 11000
          ? <div>Duplicate Entries: <b>{(typeof Object.values(err.keyValue)[0] === 'string') && Object.values(err.keyValue)[0] as string}</b> already in databse</div>
          : <div>Failed: Invoice <b>{no}</b> failed to be saved</div>
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

  const deleteInvoice = async () => {
    const res = await fetch(`${window.location.origin}/api/invoices/${params.id}`,
      { method: 'DELETE' }
    )
    let toastObj: Toast = { description: '' }
    if (res.ok) {
      toastObj = { description: <div>Invoice <b>{data?.no}</b> has been deleted</div>, className: "bg-green-300" }
      router.push(`${window.location.origin}/admin/invoices`)
    } else {
      toastObj = { description: <div>Invoice <b>{data?.no}</b> failed to be deleted</div>, variant: 'destructive' }
      setLoading(false)
    }
    const deletionToast = toast(toastObj)
    setTimeout(() => deletionToast.dismiss(), 3000)
  }

  const attemptDelete = () => {
    setLoading(true)
    const warningToast = toast({
      title: `Delete Invoice ${data?.no}`,
      description: <div>You are about to delete an Invoice. You will not be able to recover this invoice once deleted. Are you sure?</div>,
      className: "flex-col gap-3",
      action: <div className="flex justify-center gap-2">
        <Button type="button" className="w-16" onClick={deleteInvoice}>Yes</Button>
        <Button type="button" className="w-16" onClick={() => {warningToast.dismiss();setLoading(false)}}>No</Button>
      </div>
    })
  }

  const content = () => {
    if (data) {
      if (!edit) {
        return (<div className="flex-col w-full">
          <InvoiceView data={data}>
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
          </InvoiceView>
        </div>)
      } 
      return (<InvoiceForm submitHandler={submitHandler} invoiceData={data} loading={loading} >
        <div className="flex justify-center">
          <Button type="button" onClick={() => setEdit(false)}>Cancel</Button>
        </div>
      </InvoiceForm>)
    }
    return <div>Loading</div>
  }

  return (
    <>
      <div className="pt-5 pb-2 w-full pl-3">
        <h3>Invoices: {data ? data?.no : <span className="animate-pulse">aaa-000000000</span>}</h3>
      </div>
      {content()}
    </>
  )
}

export default Page