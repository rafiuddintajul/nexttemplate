"use client"

import { Button, useToast, type Toast } from '@/components/ui'
import { ProductForm } from '@/sections/admin'
import { useState } from 'react'
import { Product } from '@/types'
import { useRouter } from 'next/navigation'

const Page = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e: React.FormEvent, product: Product, callback: () => void) => {
    e.preventDefault()
    const { name, images, price, type } = product
    let toastObj: Toast = { description: '' } //default toast input
    let emptyFields = []

    setLoading(true)

    // validate for empty fields
    if (name === '') emptyFields.push('Name')
    if (images.length === 0) emptyFields.push('Images')
    if (price === 0) emptyFields.push('Price')
    if (type === '') emptyFields.push('Type')

    if (emptyFields.length === 0) {
      // submit product here
      const res = await fetch(`${window.location.origin}/api/products`, {
        method: 'POST',
        body: JSON.stringify(product)
      })

      if (res.ok) {
        // on success
        toastObj = { description: <div>New product has been created</div>, className: "bg-green-300" }
        setLoading(false)
        callback()
      } else {
        // on failure
        const err = await res.json()
        const message = <div>Failed: Product failed to be created</div>
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
      setLoading(false)
    }

    const submissionToast = toast(toastObj)
    return setTimeout(() => submissionToast.dismiss(), 3000)
  }

  return (
    <>
      <div className="flex-col max-w-2xl h-full w-full">
        <div className="pt-5 pb-2 w-full pl-3">
          <h3>Product: Create New </h3>
        </div>
        <ProductForm submitHandler={submitHandler} loading={loading}>
          <Button type="button" onClick={() => router.back()}>Back</Button>
        </ProductForm>
      </div>
    </>
  )
}

export default Page