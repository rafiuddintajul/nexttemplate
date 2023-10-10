'use client'

import { useState, useEffect } from "react"
import { ProductProfileSm, SelectOptions } from "@/components/my"
import { useRouter } from "next/navigation"
import { Product } from "@/types"
import { Plus } from "lucide-react"

const Products = () => {
  const [products, setProducts] = useState<Product[]>()
  const [selectValue, setSelectValue] = useState<string>("All")
  const [dispProducts, setDispProducts] = useState<Product[] | undefined>()
  const router = useRouter()

  useEffect(() => {
    async function getProducts() {
      const res = await fetch(`${window.location.origin}/api/products`)
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
        setDispProducts(data)
      }
    }

    getProducts()
  }, [])

  const tagHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const lookupTag = e.currentTarget.innerHTML
    setDispProducts(products?.filter(product => product.tags.find(tag => tag === lookupTag)))
    setSelectValue('tags...')
  }

  const redirectProduct = (e:React.MouseEvent, id?:string) => {
    if (id) router.push(`/admin/products/${id}`)
  }

  const filterHandler = (status:string) => {
    if (status === 'Available') {
      setDispProducts(products?.filter(product => product.availability))
      setSelectValue('Available')
    } else if (status === 'Unavailable') {
      setDispProducts(products?.filter(product => !product.availability))
      setSelectValue('Unavailable')
    } else if (status === 'All') {
      setDispProducts(products)
      setSelectValue('All')
    } else {
      return
    }
  }

  return (
    <>
      <div className="pt-5 pb-2 w-full px-3 flex justify-between">
        <div className="flex h-full gap-2">
          <h3>Products</h3>
          <div className="bg-black flex items-center rounded-full w-8 hover:cursor-pointer" onClick={()=>router.push('/admin/products/new')}>
            <Plus className="text-white mx-auto" size={18} strokeWidth={3}/>
          </div>
        </div>
        <div className="pr-2 h-">
          <SelectOptions options={['All', 'Available', 'Unavailable', 'tags...']} onValueChange={filterHandler} value={selectValue} />
        </div>
      </div>
      <div className="w-full flex-col px-2">
        {
          dispProducts
            ? dispProducts.map(product => <ProductProfileSm key={product._id} data={product} tagHandler={tagHandler} redirectProduct={redirectProduct} />)
            : <div>Loading...</div>
        }
      </div>
    </>
  )
}

export default Products
