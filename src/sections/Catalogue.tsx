'use client'

import { useState, useContext, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SlidingSection } from "./SlidingSection"
import { Button } from "@/components/ui"
import { NavContext } from "@/components/my/NavContainer"
import { ProductCard, ProdCataloguesSkeleton } from "@/components/my"
import type { Product } from "@/types"


export const Catalogue = () => {
  const nav = useContext(NavContext)
  const [products,setProducts] = useState<Product[]>()

  useEffect(()=>{
    async function getProducts(){
      const prod = await fetch('/api/products')
      setProducts(await prod.json())
    }
    getProducts()
  },[])

  const prevArrow = (clickHandler: () => void, prevItem: boolean, lable: any) => {
    const availablityClass = !prevItem ? "control-disabled" : '';
    return (
      <button type="button" aria-label="previous slide / item" className={`control-arrow control-prev ${availablityClass}`} onClick={clickHandler}>
        <ArrowLeft />
      </button>
    )
  }

  const nextArrow = (clickHandler: () => void, nextItem: boolean, lable: any) => {
    const availablityClass = !nextItem ? "control-disabled" : '';
    return (
      <button type="button" aria-label="next slide / item" className={`control-arrow control-next ${availablityClass}`} onClick={clickHandler}>
        <ArrowRight />
      </button>
    )
  }

  const dummyData = {
    _id: 'asodujnboqiw',
    name: 'Product',
    images: ['asaiuwben', 'aosudhqwebn'],
    price: 10,
    tags: ['tag1', 'tag2'],
    stock:10,
    availability: true,
    description: 'some description of the product that i dont know what to write'
  }

  const addToCart = (prod:Product) => {
    const inCartStr = localStorage.getItem('cart')
    if (inCartStr) {
      const inCart = JSON.parse(inCartStr)
      const exist = inCart.find((prodInCart:any)=>{
        return prod._id === prodInCart._id
      })
      if (!exist) {
        // warn the user product already in cart        
      } else {
        inCart.push(prod)
        localStorage.setItem('cart',JSON.stringify(inCart))
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(prod))
    }
    
    if (!nav.cart) {
      nav.setCart(true)
    } 
  }

  return (
    <div className="w-full relative py-2">
      <section className="w-full h-full flex flex-col px-2 py-0">
        <div className="h-32 flex-none flex items-center mx-auto">
          <div className="flex-col">
            <h2 className="p-2 text-center font-bold  tracking-tight decoration-4 product_title">Nunc quis magna</h2>
            <p className="p-2 mb-2 font-semibold text-center tracking-tight">Cras purus arcu, sollicitudin eu ultricies a, mollis vitae mauris. Maecenas gravida.</p>
            <div className="w-60 h-1 mx-auto bg_theme" />
          </div>
        </div>
        <SlidingSection>
          {
            !products
            ? <ProdCataloguesSkeleton />
            : products.map((prod)=>{
                return <ProductCard key={prod._id} data={prod}>
                  <div className="flex justify-center">
                    <Button type="button" className="" onClick={()=>addToCart(prod)}>Add to Cart</Button>
                  </div>
                </ProductCard>
              })
          }
        </SlidingSection>
      </section>
    </div>
  )
}


