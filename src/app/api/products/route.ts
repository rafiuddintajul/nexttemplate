import { connectDB } from '@/utils/database'
import Configurations from '@/models/configuration'
import PriceRecords from '@/models/pricesRecords'
import Products from '@/models/products'
import { Product as ProductsData } from '@/types'

export const GET = async (request: any) => {

  try {
    await connectDB()
    const products = await Products.find().populate({
      path: 'price',
      model: PriceRecords,
      transform: (doc:any) => doc ? doc.price : null
    })  
    return new Response(JSON.stringify(products), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 })
  }
}

export const POST = async (req: Request) => {
  const { name, images, price, desc, type, tags }:ProductsData = await req.json()

  try {
    await connectDB()
    // create tags if not exists
    const productConf = await Configurations.findOne({ name: 'Product' })
    const newTags = [... new Set([...tags, ...productConf.data.tags ])]
    productConf.data = {...productConf.data, tags:newTags }
    await productConf.save()

    // create product instance to get product._id to be recoreded in priceRecord first
    const product = new Products({ name, images, desc, type, tags:tags })
    // create priceRecord for the product
    const priceRecord = await PriceRecords.create({ product: product._id, price })
    // setting price on the product from priceRecords data
    product.price = priceRecord._id
    
    const res = await product.save()
    await res.populate({
      path: 'price',
      model: PriceRecords,
      transform: (doc:any) => doc ? doc.price : null
    })

    return new Response(JSON.stringify(res), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}