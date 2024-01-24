import Products from "@/models/products";
import { connectDB } from "@/utils/database";
import { Product as ProductsData } from '@/types'

export const GET = async (req: Request, { params }: any) => {
  try {
    const product = await Products.findById(params.id)
    return new Response(JSON.stringify(product), { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), { status: 500 })
    }
    return new Response(JSON.stringify(error), { status: 500 })
  }
}

export const PATCH = async (req: Request, { params }: any) => {
  const patchData: ProductsData = await req.json()
  try {
    const product = await Products.findOneAndUpdate({ _id: params.id }, patchData, { new: true })
    return new Response(JSON.stringify(product), { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message), { status: 200 })
    }
    return new Response(JSON.stringify(error), { status: 200 })
  }
}

export const DELETE = async (req: Request, { params }: any) => {
  try {
    await connectDB()
    await Products.findByIdAndDelete(params.id)
    return new Response(`Product has been deleted`, { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 200 })
  }
}
