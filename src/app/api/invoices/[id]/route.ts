import Invoices from "@/models/invoices";
import Stocks from "@/models/stocks";
import { connectDB } from "@/utils/database";
import { StockRecord } from "@/models/stocks";
import Products from "@/models/products";
import PriceRecords from "@/models/pricesRecords";

export const GET = async (req:Request, {params}:any) => {
  try {
    await connectDB()
    const invoice = await Invoices.findById(params.id).populate({
      path: 'items.product',
      model: Products,
      populate: {
        path: 'price',
        model: PriceRecords,
        transform: (doc:any) => doc === null ? null : doc.price
      }
    })
    return new Response(JSON.stringify(invoice), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify(error), {status:500})
  }
}

export const PATCH = async (req: Request, { params }: any) => {
  const { no, items, total, date, desc } = await req.json();
  try {
    await connectDB();
    const invoice = await Invoices.findOneAndUpdate({ _id: params.id}, { no, items, total, date, desc }, { new:true })
    const stocksInvoice = await Stocks.find({ reference: params.id })
    await invoice.populate({
      path: 'items.product',
      model: Products,
      populate: {
        path: 'price',
        model: PriceRecords,
        transform: (doc:any) => doc === null ? null : doc.price
      }
    })
    
    // Stock affected data change handling
    // update quantity change
    stocksInvoice.forEach(async (stock:any) => {
      const foundItem = items.find((item:any)=>stock.product.toString() === item.product._id)
      if(foundItem && foundItem.quantity !== stock.quantity){
        await Stocks.findByIdAndUpdate(stock._id, { quantity: foundItem.quantity })
      }
    })

    // new/remove stock record
    // proper record for changes-record that already created should not be recreated.
    const stockAdditional = items
      .filter((item:any) => {
        return !stocksInvoice.find((stock: any) => stock.product.toString() === item.product._id) ? true : false
      })
      .map((item: any) => {
        return {
          product: item.product,
          quantity: item.quantity,
          reference: invoice._id,
          recordType: StockRecord.INVOICE,
        }
      })

    const stockRemoval = stocksInvoice.filter((stock: any) => {
      return !items.find((item: any) => item.product._id === stock.product.toString()) ? true : false
    })
    .map((item:any)=> {
      return item._id
    })

    stockAdditional.length !== 0 && await Stocks.create(stockAdditional) // only execute if there is changes for performance
    stockRemoval.length !== 0 && await Stocks.deleteMany({ _id: { $in: stockRemoval }}) // only execute if there is changes for performance
    return new Response(JSON.stringify(invoice), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export const DELETE = async (req:Request, { params }:any) => {
  try {
    await connectDB()
    const res = await Invoices.findByIdAndDelete(params.id)
    if (!res) {
      throw new Error(`Ivoice: ${params.id} is not found`)
    }
    await Stocks.deleteMany({ reference: params.id })
    return new Response(`Invoice: ${params.id} has been deleted`, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), { status: 500 })
    }
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
