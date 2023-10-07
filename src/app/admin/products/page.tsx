'use client'

import { ProductProfileSm, SelectOptions } from "@/components/my"
import { Product } from "@/types"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const Products = () => {
  const [products, setProducts] = useState<Product[]>()
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
  }

  const redirectProduct = (e:React.MouseEvent, id?:string) => {
    if (id) router.push(`/admin/products/${id}`)
  }

  const filterAvailable = (status:string) => {
    if (status === 'Available') {
      setDispProducts(products?.filter(product => product.availability))
    } else if (status === 'Unavailable') {
      setDispProducts(products?.filter(product => !product.availability))
    } else {
      setDispProducts(products)
    }
  }

  return (
    <section className="flex flex-1 flex-col">
      <div className="flex-col max-w-2xl h-full w-full">
        <div className="pt-5 pb-2 w-full pl-3 flex justify-between">
          <h3>Products</h3>
          <div className="pr-2">
            <SelectOptions options={['All', 'Available', 'Unavailable']} defaultValue="All" onValueChange={filterAvailable} />
          </div>
        </div>
        <div className="w-full flex-col px-2">
          {
            dispProducts
              ? dispProducts.map(product => <ProductProfileSm key={product._id} data={product} tagHandler={tagHandler} redirectProduct={redirectProduct} />)
              : <div>Loading...</div>
          }
        </div>
      </div>
      <div className="sticky bottom-0 flex justify-end p-2">
        <Link href="/admin/products/new" className="shadcn_button_default">Add Product</Link>
      </div>
    </section>
  )
}

export default Products
