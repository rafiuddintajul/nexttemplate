import { connectDB } from "@/utils/database"
import Configs from "@/models/configuration"

export const GET = async() => {
  try {
    await connectDB()
    const productConfig = await Configs.findOne({ name:'Product' })
    return new Response(JSON.stringify(productConfig), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch configurations', { status: 500 })
  }
}