"use client"

import { Button, useToast, type Toast } from '@/components/ui'
import { WriteOffForm } from '@/sections/admin'
import { useState } from 'react'
import { WriteOffFormFields } from '@/types'
import { useRouter } from 'next/navigation'

const Page = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e: React.FormEvent, writeoff: WriteOffFormFields, callback: () => void) => {
    e.preventDefault()
    const { date, items, reason } = writeoff
    let toastObj: Toast = { description: '' } //default toast input
    let emptyFields = []

    setLoading(true)

    // validate for empty fields
    if (items.length === 0) emptyFields.push('Items\' quantity')
    if (!date) emptyFields.push('Date')
    if (!reason) emptyFields.push('Reason')

    if (emptyFields.length === 0) {
      // submit invoice here
      const res = await fetch(`${window.location.origin}/api/writeoffs`, {
        method: 'POST',
        body: JSON.stringify(writeoff)
      })

      if (res.ok) {
        // on success
        toastObj = { description: <div>New write-off has been created</div>, className: "bg-green-300" }
        setLoading(false)
        callback()
      } else {
        // on failure
        const err = await res.json()
        const message = <div>Failed: write-off failed to be created</div>
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
    <div className="flex-col max-w-2xl w-full">
      <div className="pt-5 pb-2 w-full pl-3">
        <h3>Write-Off: Create New </h3>
      </div>
      <WriteOffForm submitHandler={submitHandler} loading={loading}>
        <Button type="button" onClick={()=>router.back()}>Back</Button>
      </WriteOffForm>
    </div>
  )
}

export default Page