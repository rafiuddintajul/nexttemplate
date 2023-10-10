'use client'

import { Button, Label, Input, Textarea, Switch } from "@/components/ui"
import { InputAutoComplete, Tag, type InputAutoCompOpt } from "@/components/my"
import { X } from "lucide-react"
import { Product, ProductConfiguration } from "@/types"
import { ReactNode, useReducer, useRef, useState } from "react"
import useSWR from "swr"
import { ProductReducer, emptyProd, ProdAct } from "@/utils"

type ProductFormProps = {
  productData?: Product,
  submitHandler: (e: React.FormEvent, product: Product, callback: () => void) => void,
  children?: ReactNode,
  loading?: boolean
}

const prodConfFetcher = async () => {
  const res = await fetch(`${window.location.origin}/api/products/conf`)
  const data = await res.json()
  return data
}

export const ProductForm = ({ submitHandler, children, productData = emptyProd, loading }: ProductFormProps) => {
  const [prodState, dispatch] = useReducer(ProductReducer, productData)
  const { name, images, price, desc, type, tags, availability } = prodState

  const [ tag, setTag ] = useState<InputAutoCompOpt<string>|undefined>(undefined)

  const imageRef = useRef<HTMLInputElement>(null)
  const availableRef = useRef<HTMLButtonElement>(null)

  // Query available tags
  const { data, error, isLoading } = useSWR<ProductConfiguration>(`/api/product`, prodConfFetcher, { revalidateOnFocus: false })
  const tagsOption = data && data.data.tags.map(tag => ({ label: tag, value: tag }))

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    dispatch({ type: ProdAct.NAME, payload: { name } })
  }

  const imagesHandler = () => {
    if (imageRef.current) {
      const image = imageRef.current.value
      dispatch({ type: ProdAct.ADDIMGS, payload: { image } })
    }
  }

  const remImages = (url:string) => {
    dispatch({ type: ProdAct.REMIMGS, payload: { image:url } })
  }

  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value)
    if (!isNaN(price)) dispatch({ type: ProdAct.PRICE, payload: { price } })
  }

  const descHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const desc = e.target.value
    dispatch({ type: ProdAct.DESC, payload: { desc } })
  }

  const typeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value
    dispatch({ type: ProdAct.TYPE, payload: { type } })
  }

  const addTagHandler = () => {
    if (tag && tag?.value !== '') {
      if (!tags.find(i => i === tag.value)) {
        dispatch({ type: ProdAct.ADDTAGS, payload: { tag:tag.value } })
      }
    }
  }

  const remTagHandler = (tagInput: string) => {
    dispatch({ type: ProdAct.REMTAGS, payload: { tag: tagInput } })
  }

  const availabilityHandler = () => {
    dispatch({ type: ProdAct.AVAILABLE, payload: { availability: !availability } })
  }

  return (
    <form onSubmit={(e) => submitHandler(e, prodState, () => dispatch({ type: ProdAct.CLEAR }))} className="w-full px-4">
      <div className="py-1">
        <Label>Name:</Label>
        <Input type="text" value={name} onChange={nameHandler} />
      </div>
      <div className="py-1">
        <Label>Images:</Label>
        <div className="flex gap-1">
          <Input type="text" ref={imageRef} />
          <Button type="button" onClick={imagesHandler} >Add</Button>
        </div>
        <div className="flex-col gap-1">
          {
            images.length > 0 && images.map((image, i) => <div key={`${image}_${i}`} className="flex justify-between gap-1 text-sm py-1">
              <p className="flex-1 truncate">{image}</p>
              <span className="flex-none w-14 flex items-center text-xs" onClick={()=>remImages(image)}>remove <X size={13}/></span>
            </div>)
          }
        </div>
      </div>
      <div className="py-1 flex justify-between gap-2">
        <div>
          <Label>Price:</Label>
          <Input type="number" value={price} onChange={priceHandler} />
        </div>
        <div>
          <Label>Type:</Label>
          <Input type="text" value={type} onChange={typeHandler} />
        </div>
      </div>
      <div className="py-1">
        <Label>Tags:</Label>
        <div className="flex gap-1 mb-1">
          {
            !isLoading
              ? (<>
                <InputAutoComplete emptyMessage="not found" options={tagsOption ? tagsOption : []} className="border rounded-md flex-1" placeholder="search tags..." allowNewValue={true} onValueChange={setTag} inputClassName="text-sm" />
                <Button type="button" onClick={addTagHandler}>Add</Button>
              </>)
              : (<div className="border rounded-md h-10 w-full bg-gray-200 animate-pulse flex justify-center">
                <div className="my-auto text-sm">Preparing tags, please wait...</div>
              </div>)
          }
        </div>
        <div className="flex gap-1">
          {
            tags.length > 0 && tags.map(tag =>
              <Tag key={tag} name={tag} removeable={true} onRemove={remTagHandler} className="border-black text-black" />
            )
          }
        </div>
      </div>
      <div className="py-1">
        <Label>Description:</Label>
        <Textarea value={desc} onChange={descHandler} />
      </div>
      <div className="py-1 flex items-center">
        <Label className="mr-2">Availability:</Label>
        <div className="flex items-center">
          <Switch ref={availableRef} checked={availability} onCheckedChange={availabilityHandler} className="h-[20px]" />
        </div>
      </div>
      <div className="flex justify-center gap-2 py-1">
        <Button type="submit" disabled={loading}>Submit</Button>
        {children}
      </div>
    </form>
  )
}