import Products from "@/models/products";
import PriceRecords from "@/models/pricesRecords";
import { connectDB } from "@/utils/database";

export const GET = async (req:Request, {params}:any) => {
  try {
    const product = await Products.findById(params.id).populate({
      path: 'price',
      model: PriceRecords,
      transform: (doc:any) => doc ? doc.price : null
    })
    return new Response(JSON.stringify(product), { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), { status: 500 })
    }
    return new Response(JSON.stringify(error), { status: 500 })
  }
}

export const PATCH = async(req:Request, {params}:any) => {
  const { name, images, price, desc, type, tags, availability } = await req.json()
  try {
    const product = await Products.findOneAndUpdate({ _id:params.id }, { name, images, price, desc, type, tags, availability }, { new:true })
    await product.populate({
      path: 'price',
      model: PriceRecords,
      transform: (doc:any) => doc ? doc.price : null
    })
    
    return new Response(JSON.stringify(product), {status:200})
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), {status:200})
    }
    return new Response(JSON.stringify(error), {status:200})
  }
}

export const DELETE = async(req:Request, {params}:any) => {
  try {
    await connectDB()
    await Products.findByIdAndDelete(params.id)
    return new Response(`Product ${params.id} has been deleted`, {status:200})
  } catch (error) {
    return new Response(JSON.stringify(error), {status:200})
  }
}
