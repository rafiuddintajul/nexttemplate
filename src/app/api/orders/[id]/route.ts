import { connectDB } from "@/utils/database"
import Orders from "@/models/orders"
import Stocks from "@/models/stocks"
import Products from "@/models/products"
import { ItemGroup } from "@/types"

export const GET = async (req:Request, { params }:{ params: { id: string } }) => {
  try {
    await connectDB()
    let order = await Orders.findById(params.id).populate({
      path:'items.product',
      model:Products
    })
    if(!order) throw new Error(`Unable to retrieve Order:${params.id}`)

    return new Response(JSON.stringify(order), { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), { status: 500 })
    }
    return new Response(JSON.stringify(error), { status: 500 })
  }
}

export const PATCH = async (req:Request, { params }:{ params: { id:string }}) => {
  const { name, address, items, date, description, status } = await req.json()
  try {
    await connectDB()
    const order = await Orders.findById(params.id)
    if (!order) throw new Error(`Undable to retreive Order:${params.id}`)

    // ITEMS changes
    const newItemList:any[] = []
    const changedProdStock:any[] = []
    let total = 0

    // Compare existing Item with new Item
    order.items.forEach(async (existingItem:ItemGroup)=> {
      const foundItems = items.find((item:any)=> item.product._id === existingItem.product._id)
      if (foundItems) {
        // If exisiting Items
        newItemList.push(foundItems)
        // Change Stock 
        const diff = foundItems.quantity - existingItem.quantity
        const prod = await Products.findById(existingItem.product._id)
        prod.stock += diff
        // If prod.stock < 0, means out of stock
        if (prod.stock < 0 ) throw new Error(`Stock for product ${prod.name} is not enough`)
        changedProdStock.push(prod)
        // Change in price
        total += prod.price * foundItems.quantity
      } else {
        // If not exist remove item and restore back the stock deducted
        const prod = await Products.findById(existingItem.product._id)
        prod.stock += existingItem.quantity
        changedProdStock.push(prod)
      }
    })

    // Compare new Item with existing Item to record new Item
    items.forEach(async (item:ItemGroup) => {
      const foundItems = order.items.find((existingItem:any)=> existingItem.product._id === item.product._id)
      if (!foundItems) {
        // If not exists means new Items
        newItemList.push(item)
        // Change Stock
        const prod = await Products.findById(item.product._id)
        prod.stock -= item.quantity
        // If prod.stock < 0, means out of stock
        if (prod.stock < 0 ) throw new Error(`Stock for product ${prod.name} is not enough`)
        changedProdStock.push(prod)
        // Change in price
        total += prod.price * item.quantity
      }
    })
    
    order.name = name
    order.address = address
    order.items = newItemList
    order.date = date
    order.total = total
    order.description = description
    order.status = status
    await order.save()    

    // Save confirm changes of all product
    changedProdStock.forEach(async prod => {
      await prod.save()
    })

    return new Response(JSON.stringify(order), { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), { status: 500 })
    }
    return new Response(JSON.stringify({ error : 'this error went through'}), { status: 500 })
  }
}

export const DELETE = async (req:Request, { params }:any)=> {
  const id = params.id

  try {
    await connectDB()
    const deleteOrder = await Orders.findByIdAndDelete(id)
    if (!deleteOrder) {
      throw new Error(`Order ${id} could not be found.`)
    }

    return new Response(`Order ${id} has been deleted.`,{ status:200})
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message),{status:500})
    }
    return new Response(JSON.stringify(error),{ status:500 })
  }
}