import { connectDB } from '@/utils/database'
import Stocks from '@/models/stocks'

export const GET = async () => {
  try {
    await connectDB()
    const res = await Stocks.find()
    return new Response(JSON.stringify(res), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch content', { status: 500 })
  }
}
