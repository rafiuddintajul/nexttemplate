import { connectDB } from '@/utils/database'
import Invoices from '@/models/invoices'
import Stocks, { StockRecord } from '@/models/stocks'
import Products from '@/models/products'
import PriceRecords from '@/models/pricesRecords'

export const GET = async () => {
  try {
    await connectDB()
    const invoices = await Invoices.find().populate({
      path: 'items.product',
      model: Products,
      populate: {
        path: 'price',
        model: PriceRecords,
        transform: (doc:any) => doc === null ? null : doc.price
      }
    })
    return new Response(JSON.stringify(invoices), { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), { status: 500 })
    }
    return new Response(JSON.stringify(error), { status: 500 })
  }
}

export const POST = async (req: Request) => {
  const data = await req.json()
  try {
    await connectDB()

    const invoice = await Invoices.create(data)
    await Stocks.flow(StockRecord.INVOICE, invoice)

    const res = await invoice.populate({
      path: 'items.product',
      model: Products,
      populate: {
        path: 'price',
        model: PriceRecords,
        transform: (doc:any) => doc === null ? null : doc.price
      }
    })

    return new Response(JSON.stringify(res), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
