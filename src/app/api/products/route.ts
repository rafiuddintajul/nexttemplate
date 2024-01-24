import { connectDB } from '@/utils/database'
import Configurations from '@/models/configuration'
import Products from '@/models/products'
import { Product as ProductsData } from '@/types'

export const GET = async (request: any) => {

  try {
    await connectDB()
    const products = await Products.find()
    return new Response(JSON.stringify(products), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 })
  }
}

export const POST = async (req: Request) => {
  const { name, images, price, tags, stock, availability, description }:ProductsData = await req.json()

  try {
    await connectDB()

    // create 'tags' if not exists
    const productConf = await Configurations.findOne({ name: 'ProductConfig' })
    const newTags = [... new Set([...tags, ...productConf.data.tags ])]
    productConf.data = {...productConf.data, tags:newTags }
    await productConf.save()

    // create 'product' without tags
    let productRecord:any = { name, images, price, stock, availability, description }
    // only include tags if tags is not empty. This to ensure the product default value triggered in schema model
    if (tags.length !== 0) { productRecord.tags = tags }
    const product = await Products.create(productRecord)
    return new Response(JSON.stringify(product), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}