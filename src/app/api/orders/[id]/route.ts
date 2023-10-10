import { connectDB } from "@/utils/database"
import Orders from "@/models/orders"
import Stocks from "@/models/stocks"
import { StockRecord } from "@/models/stocks"
import Products from "@/models/products"
import PriceRecords from "@/models/pricesRecords"

export const GET = async (req:Request, { params }:{ params: { id: string } }) => {
  try {
    await connectDB()
    let res = await Orders.findById(params.id).populate({
      path: 'items.product',
      model: Products,
      populate: {
        path: 'price',
        model: PriceRecords,
        transform: (doc:any) => doc === null ? null : doc.price
      }
    })
    if(!res){
      throw new Error(`Unable to retrieve Order:${params.id}`)
    }
    return new Response(JSON.stringify(res), { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), { status: 500 })
    }
    return new Response(JSON.stringify(error), { status: 500 })
  }
}

export const PATCH = async (req:Request, { params }:{ params: { id:string }}) => {
  const { name, address, items, date, total, desc, status } = await req.json()
  try {
    await connectDB()
    const order = await Orders.findOneAndUpdate({ _id:params.id }, { name, address, items, date, desc, status }, { new: true})
    const stocksOrder = await Stocks.find({ reference: params.id })
    await order.populate({
      path: 'items.product',
      model: Products,
      populate: {
        path: 'price',
        model: PriceRecords,
        transform: (doc:any) => doc === null ? null : doc.price
      }
    })

    // Stock affected data change handling
    // quantity change
    stocksOrder.forEach(async (stock:any) => {
      const foundItem = items.find((item:any)=>stock.product.toString() === item.product)
      if(foundItem && foundItem.quantity !== stock.quantity){
        await Stocks.findByIdAndUpdate(stock._id, { quantity: foundItem.quantity })
      }
    })

    // new/remove stock record
    const stockAdditional = items
      .filter((item: any) => {
        return !stocksOrder.find((stock: any) => stock.product.toString() === item.product) ? true : false
      })
      .map((item: any) => {
        return {
          product: item.product,
          quantity: item.quantity,
          reference: order._id,
          recordType: StockRecord.SHIPPING
        }
      })

    const stockRemoval = stocksOrder.filter((stock: any) => {
      return !items.find((item: any) => item.product === stock.product.toString()) ? true : false
    })
    .map((item:any)=> {
      return item._id
    })

    await Stocks.create(stockAdditional)
    await Stocks.deleteMany({ _id: { $in: stockRemoval }})

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
    const order = await Orders.findByIdAndDelete(id)
    if (!order) {
      throw new Error(`Order ${id} could not be found.`)
    }

    // Stock affected data handling
    await Stocks.deleteMany({ reference: id })

    return new Response(`Order ${id} has been deleted.`,{ status:200})
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message),{status:500})
    }
    return new Response(JSON.stringify(error),{ status:500 })
  }
}