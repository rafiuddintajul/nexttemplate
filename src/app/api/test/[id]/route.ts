import Invoices from "@/models/invoices";
import { connectDB } from "@/utils/database";
import Products from "@/models/products";
import PriceRecords from "@/models/pricesRecords";

export const GET = async (req:Request, {params}:any) => {
  try {
    await connectDB()
    // const res = await Invoices.findById(params.id).populate({
    //   path: 'items.product',
    //   model: Products,
    //   populate: {
    //     path: 'price',
    //     model: PriceRecords,
    //     select: 'price -_id',
    //   }
    // })
    const res = await Invoices.findById(params.id).populate({
      path: 'items.product',
      model: Products,
      populate: {
        path: 'price',
        model: PriceRecords,
        transform: doc => doc === null ? null : doc.price
      }
    })
    return new Response(JSON.stringify(res), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify(error), {status:500})
  }
}

