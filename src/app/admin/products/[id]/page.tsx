'use client'

import { useToast, Button, type Toast } from '@/components/ui'
import type { Product } from '@/types'
import { ProductForm, ProductView } from '@/sections/admin'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const productFetcher = async (url: string) => {
  const res = await fetch(`${url}`)
  const data = await res.json()
  return data
}

const Page = ({ params }: { params: { id: string } }) => {
  // Query order data
  const { data, error, mutate } = useSWR<Product>(`/api/products/${params.id}`, productFetcher, { revalidateOnFocus: false, revalidateOnMount: true })
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(false)

  const submitHandler = async (e: React.FormEvent, product: Product) => {
    e.preventDefault()
    setLoading(true)

    const { name, images, description } = product
    let toastObj: Toast = { description: '' } //default toast input
    let emptyFields = []

    // validate for empty fields
    if (name === '') emptyFields.push('Name')
    if (images.length === 0) emptyFields.push('Image')
    if (description === '') emptyFields.push('Description')

    if (emptyFields.length === 0) {
      // submit order here
      const res = await fetch(`${window.location.origin}/api/products/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(product)
      })
      
      if (res.ok) {
        // on success
        toastObj = { description: <div>Product <b>{params.id}</b> has been saved</div>, className: "bg-green-300" }
        setEdit(false)
        // reavalidate order
        mutate(await res.json())
      } else {
        // on failure
        console.log(res)
        const err = await res.json()
        console.log(err)
        const message = err.code === <div>Failed: Product <b>{params.id}</b> failed to be saved</div>
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

    setLoading(false)
    const submissionToast = toast(toastObj)
    return setTimeout(() => submissionToast.dismiss(), 3000)
  }

  const deleteProduct = async () => {
    const res = await fetch(`${window.location.origin}/api/products/${params.id}`,
      { method: 'DELETE' }
    )
    let toastObj: Toast
    if (res.ok) {
      toastObj = { description: <div>Product <b>{data?.name}</b> has been deleted</div>, className: "bg-green-300" }
      router.push(`${window.location.origin}/admin/products`)
    } else {
      toastObj = { description: <div>Product <b>{data?.name}</b> failed to be deleted</div>, variant: 'destructive' }
      setLoading(false)
    }
    const deletionToast = toast(toastObj)
    setTimeout(() => deletionToast.dismiss(), 3000)
  }

  const attemptDelete = () => {
    setLoading(true)
    const warningToast = toast({
      title: `Delete Product ${data?.name}`,
      description: <div>You are about to delete a product. You will not be able to undo this once confirmed. Are you sure?</div>,
      className: "flex-col gap-3",
      action: <div className="flex justify-center gap-2">
        <Button type="button" className="w-16" onClick={deleteProduct}>Yes</Button>
        <Button type="button" className="w-16" onClick={() => {warningToast.dismiss();setLoading(false)}}>No</Button>
      </div>
    })
  }

  const content = () => {
    if (data) {
      if (!edit) {
        return (
          <ProductView data={data} >
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
          </ProductView>
        )
      } 
      return (<ProductForm submitHandler={submitHandler} productData={data} loading={loading} >
        <div className="flex justify-center">
          <Button type="button" onClick={() => setEdit(false)}>Cancel</Button>
        </div>
      </ProductForm>)
    }
    return <div>Loading</div>
  }

  return (
    <div className="flex container justify-center">
      <div className="flex-col max-w-2xl w-full p-2">
        <div className="flex-none pt-5 pb-2 w-full">
          <h3 className="text-center">{data ? data?.name : <span className="animate-pulse">Loading Product...</span>}</h3>
        </div>
        {content()}
      </div>
    </div>
  )
}

export default Page