import { connectDB } from '@/utils/database'
import WriteOffs from '@/models/writeoffs'
import Products from '@/models/products'
import PriceRecords from '@/models/pricesRecords'
import Stocks, { StockRecord } from '@/models/stocks'

export const GET = async (req:Request) => {
  
  try {
    await connectDB()
    const writeoffs = await WriteOffs.find().populate({
      path:'items.product',
      model: Products,
      populate: {
        path:'price',
        model: PriceRecords,
        transform: (doc) => doc === null ? null : doc
      }
    })
    return new Response(JSON.stringify(writeoffs), {status:200})
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), {status:200})
    }
    return new Response(JSON.stringify(error), {status:200})
  }
}

export const POST = async (req:Request) => {
  const data = await req.json()
  try {
    await connectDB()

    const writeoff = await WriteOffs.create(data)
    await Stocks.flow(StockRecord.WRITEOFF, writeoff)

    await writeoff.populate({
      path: 'items.product',
      model: Products,
      populate: {
        path: 'price',
        model: PriceRecords,
        transform: (doc:any) => doc === null ? null : doc.price
      }
    })
    
    return new Response(JSON.stringify(writeoff), {status:200})
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), {status:200})
    }
    return new Response(JSON.stringify(error), {status:200})
  }
}