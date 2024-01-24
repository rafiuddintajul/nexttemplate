import { connectDB } from "@/utils/database"
import Products from "@/models/products"
import Orders from "@/models/orders"
import { Order } from "@/types"

export const GET = async (req: Request) => {
  try {
    await connectDB()
    const orders = await Orders.find().populate({
      path:'items.product',
      model: Products
    })
    return new Response(JSON.stringify(orders), { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), { status: 500 })
    }
    return new Response(JSON.stringify(error), { status: 500 })
  }
}

export const POST = async (req: Request) => {
  const { name, address, items, date, description, status }: Order = await req.json()

  try {
    await connectDB()
    // 
    const availableProducts:any[] = []
    let total = 0
    // Check if there is unavailable product before update any
    items.forEach(async item => {
      if (item.product._id) {
        const prod = await Products.findById(item.product._id)
        if (prod) {
          // Update stock
          prod.stock -= item.quantity
          availableProducts.push(prod)
          // Total calculation
          total += prod.price*item.quantity
          return
        }
        throw new Error(`No Product found by the id ${item.product._id}`)
      }
      // Stop the process if there is even an unavailable product
      throw new Error('No Product id provided')
    })
    // Save each ordered products stock changes
    availableProducts.forEach(async prod => {
      await prod.save()
    })
    
    const orderData = { name, address, items, total, date, description, status }
    const order = await Orders.create(orderData)

    return new Response(JSON.stringify(order), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}