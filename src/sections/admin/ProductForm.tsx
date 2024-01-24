'use client'

import { Button, Label, Input, Textarea, Switch } from "@/components/ui"
import { InputAutoComplete, Tag, type InputAutoCompOpt } from "@/components/my"
import { X } from "lucide-react"
import { Product, ProductConfig } from "@/types"
import { ReactNode, useReducer, useRef, useState } from "react"
import useSWR from "swr"
import { ProductReducer, emptyProd, ProdAct, ProdReducer } from "@/utils"

type ProductFormProps = {
  productData?: Product | undefined,
  submitHandler: (e: React.FormEvent, product: Product, callback: () => void) => void,
  children?: ReactNode,
  loading?: boolean
}

const prodConfFetcher = async () => {
  const res = await fetch(`${window.location.origin}/api/configs/ProductConfig`)
  return await res.json()
}

export const ProductForm = ({ submitHandler, children, productData, loading }: ProductFormProps) => {
  const initialProdState = productData ? { ...productData, price:productData.price.toString() } : emptyProd // convert price to string for displaying purpose. Will convert back on submission
  const [prodState, dispatch] = useReducer(ProductReducer, initialProdState)
  const { name, images, price, tags, stock, availability, description } = prodState
  const [ tag, setTag ] = useState<InputAutoCompOpt<string>|undefined>(undefined)

  const imageRef = useRef<HTMLInputElement>(null)
  const availableRef = useRef<HTMLButtonElement>(null)

  // Query available tags
  const { data:prodConfig, isLoading } = useSWR<ProductConfig>(`/api/configs/ProductConfig`, prodConfFetcher, { revalidateOnFocus: false })
  const tagsOption = prodConfig && prodConfig.data.tags.map(tag => ({ label: tag, value: tag }))


  // NAME
  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    dispatch({ type: ProdAct.NAME, payload: { name } })
  }

  // IMAGES
  const imagesHandler = () => {
    if (imageRef.current) {
      const image = imageRef.current.value
      dispatch({ type: ProdAct.ADDIMGS, payload: { image } })
    }
  }
  const remImages = (url:string) => {
    dispatch({ type: ProdAct.REMIMGS, payload: { image:url } })
  }

  // PRICE
  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /^[0-9]*\.?[0-9]{0,2}$/gm
    let price = e.target.value
    // Only accept pattern 123.23
    if (pattern.test(price)) {
      // If delete all
      if (price === '') {
        price = '0'
      }
      // If start from '0'
      if(price[0] === '0'){
        price = price.slice(1)
      }
      dispatch({ type: ProdAct.PRICE, payload: { price } })
    }
  }

  // TAGS
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

  // STOCK
  const stockHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stock = Number(e.target.value)
    if (!isNaN(stock)) {
      dispatch({ type: ProdAct.STOCK, payload: { stock } })
    }
  }

  // AVAILABILITY
  const availabilityHandler = () => {
    dispatch({ type: ProdAct.AVAILABLE, payload: { availability: !availability } })
  }

  // DESCRIPTIONS
  const descHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value
    dispatch({ type: ProdAct.DESC, payload: { description } })
  }

 

  return (
    <form onSubmit={(e) => submitHandler(e, {...prodState, price:Number(prodState.price)}, () => dispatch({ type: ProdAct.CLEAR }))} className="w-full px-4">
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
              <span className="flex-none flex items-center text-xs hover:cursor-pointer" onClick={()=>remImages(image)}><X size={13}/></span>
            </div>)
          }
        </div>
      </div>
      <div className="py-1 flex justify-between gap-2">
        <div>
          <Label>Price:</Label>
          <Input type="text" value={price} onChange={priceHandler} />
        </div>
        <div>
          <Label>Stock:</Label>
          <Input type="text" value={stock} onChange={stockHandler} />
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
        <Textarea value={description} onChange={descHandler} />
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