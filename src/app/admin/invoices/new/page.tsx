"use client"

import { Button, useToast, type Toast } from '@/components/ui'
import { InvoiceForm } from '@/sections/admin'
import { useState } from 'react'
import { InvoiceFormFields } from '@/types'
import { useRouter } from 'next/navigation'

const Page = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e: React.FormEvent, invoice: InvoiceFormFields, callback: () => void) => {
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
      const res = await fetch(`${window.location.origin}/api/invoices`, {
        method: 'POST',
        body: JSON.stringify(invoice)
      })

      if (res.ok) {
        // on success
        toastObj = { description: <div>Invoice <b>{no}</b> has been created</div>, className: "bg-green-300" }
        setLoading(false)
        callback()
      } else {
        // on failure
        const err = await res.json()
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

  return (
    <section className="flex flex-1 flex-col justify-center">
      <div className="flex-col max-w-2xl w-full">
        <div className="pt-5 pb-2 w-full pl-3">
          <h3>Invoices: Create New </h3>
        </div>
        <InvoiceForm submitHandler={submitHandler} loading={loading}>
          <Button type="button" onClick={()=>router.back()}>Back</Button>
        </InvoiceForm>
      </div>
    </section>
  )
}

export default Page