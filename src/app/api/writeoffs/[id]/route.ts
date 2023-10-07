import WriteOffs from "@/models/writeoffs";
import Stocks from "@/models/stocks";
import Products from "@/models/products";
import PriceRecords from "@/models/pricesRecords";
import { connectDB } from "@/utils/database";
import { StockRecord } from "@/models/stocks";

export const GET = async (req:Request, {params}:any) => {
  try {
    await connectDB()
    const res = await WriteOffs.findById(params.id).populate({
      path: 'items.product',
      model: Products,
      populate: {
        path: 'price',
        model: PriceRecords,
        transform: (doc:any) => doc === null ? null : doc.price
      }
    })
    return new Response(JSON.stringify(res), { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), {status:500})
    }
    return new Response(JSON.stringify(error), {status:500})
  }
}

export const PATCH = async (req: Request, { params }: any) => {
  const { items, total, date, reason } = await req.json();
  try {
    await connectDB();
    const writeoff = await WriteOffs.findOneAndUpdate({_id: params.id}, { items, date, reason, total })
    const stocksWriteoff = await Stocks.find({ reference: params.id })
    await writeoff.populate({
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
    stocksWriteoff.forEach(async (stock:any) => {
      const foundItem = items.find((item:any)=>stock.product.toString() === item.product)
      if(foundItem && foundItem.quantity !== stock.quantity){
        await Stocks.findByIdAndUpdate(stock._id, { quantity: foundItem.quantity })
      }
    })

    // new/remove stock record
    const stockAdditional = items
      .filter((item: any) => {
        return !stocksWriteoff.find((stock: any) => stock.product.toString() === item.product) ? true : false
      })
      .map((item: any) => {
        return {
          product: item.product,
          quantity: item.quantity,
          reference: writeoff._id,
          recordType: StockRecord.INVOICE,
        }
      })

    const stockRemoval = stocksWriteoff.filter((stock: any) => {
      return !items.find((item: any) => item.product === stock.product.toString()) ? true : false
    })
    .map((item:any)=> {
      return item._id
    })

    await Stocks.create(stockAdditional)
    await Stocks.deleteMany({ _id: { $in: stockRemoval }})

    return new Response(JSON.stringify(writeoff), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), { status: 500 });
    }
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export const DELETE = async (req:Request, { params }:any) => {
  try {
    await connectDB()
    const res = await WriteOffs.findByIdAndDelete(params.id)
    if (!res) {
      throw new Error(`Writeoff: ${params.id} is not found`)
    }
    // delete affected stock record
    await Stocks.deleteMany({ reference: params.id })
    return new Response(`Writeoff ${params.id} has been deleted`, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), { status: 500 })
    }
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
