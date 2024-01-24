'use client'

import { useState, useEffect } from "react"
import { SelectOptions } from "@/components/my"
import { useRouter } from "next/navigation"
import { Product } from "@/types"
import { Plus } from "lucide-react"
import { ProductList, ProdListSkeleton } from "@/components/my"

const Products = () => {
  const [products, setProducts] = useState<Product[]>()
  const [selectValue, setSelectValue] = useState<string>("All")
  const [dispProducts, setDispProducts] = useState<Product[]>([])
  const router = useRouter()

  useEffect(() => {
    // PRODUCT query all
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

  const tagHandler = (e: React.MouseEvent) => {
    e.stopPropagation()
    const lookupTag = e.currentTarget.innerHTML
    const filteredProduct = products?.filter(product => product.tags.find(tag => tag === lookupTag))
    filteredProduct && setDispProducts(filteredProduct)
    setSelectValue('tags...')
  }

  const redirectProduct = (e:React.MouseEvent, id?:string) => {
    if (id) router.push(`/admin/products/${id}`)
  }

  const filterHandler = (status:string) => {
    if (status === 'Available') {
      const filteredProduct = products?.filter(product => product.availability)
      filteredProduct && setDispProducts(filteredProduct)
      setSelectValue('Available')
    } else if (status === 'Unavailable') {
      const filteredProduct = products?.filter(product => !product.availability)
      filteredProduct && setDispProducts(filteredProduct)
      setSelectValue('Unavailable')
    } else if (status === 'All') {
      products ? setDispProducts(products) : setDispProducts([])
      setSelectValue('All')
    } else {
      return
    }
  }

  return (
    <div className="flex flex-col">
      <div className="container">
        <p className="text-sm mt-5 text-center">Manage products. To add new product click on the big plus button above</p>
        <div className="flex justify-center">
          <div className="flex-col overflow-hidden w-full max-w-4xl">
            {
              products
              ? <ProductList list={dispProducts} tagHandler={tagHandler} redirectProduct={redirectProduct} />
              : <ProdListSkeleton />
            }
          </div>
        </div>
      </div>
      <div className="bg-black flex items-center rounded-full w-10 hover:cursor-pointer absolute top-1 right-1 h-10" onClick={()=>router.push('/admin/products/new')}>
        <Plus className="text-white mx-auto" size={18} strokeWidth={3}/>
      </div>
    </div>
  )
}

export default Products
