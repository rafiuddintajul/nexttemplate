import { connectDB } from "@/utils/database"
import Orders from "@/models/orders"
import Stocks, { StockRecord } from "@/models/stocks"
import Products from "@/models/products"
import PriceRecords from "@/models/pricesRecords"

export const GET = async (req:Request) => {
  try {
    await connectDB()
    const orders = await Orders.find().populate({
      path: 'items.product',
      model: Products,
      populate: {
        path: 'price',
        model: PriceRecords,
        transform: (doc:any) => doc === null ? null : doc.price
      }
    })
    return new Response(JSON.stringify(orders), { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), { status: 500 })
    }
    return new Response(JSON.stringify(error), { status: 500 })
  }
}

export const POST = async (req:Request) => {
  const data = await req.json()
  try {
    await connectDB()

    const order = await Orders.create(data)
    await Stocks.flow(StockRecord.ORDER, order)

    await order.populate({
      path: 'items.product',
      model: Products,
      populate: {
        path: 'price',
        model: PriceRecords,
        transform: (doc:any) => doc === null ? null : doc.price
      }
    })
    
    return new Response(JSON.stringify(order), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }

}