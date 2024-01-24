import { Product } from "@/types"
import { ProductProfileSm } from "./ProductProfileSm"
import React from "react"

type ProductListProps = {
  list:Product[],
  tagHandler:(e:React.MouseEvent)=>void,
  redirectProduct:(e:React.MouseEvent, id?:string)=>void,
}

export const ProductList = ({ list, tagHandler, redirectProduct }:ProductListProps) => {
  return (
    <div className="w-full flex-col px-2 container">
      {
          list.length > 0
            ? list.map(product => <ProductProfileSm key={product._id} data={product} tagHandler={tagHandler} redirectProduct={redirectProduct} />)
            : <div>No Product has been registered yet</div>
        }
    </div>
  )
}
