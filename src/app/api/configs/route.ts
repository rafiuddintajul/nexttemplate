import { connectDB } from '@/utils/database'
import Configs from '@/models/configuration'

export const GET = async () => {
  try {
    await connectDB()
    const configs = await Configs.find()
    return new Response(JSON.stringify(configs), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch content', { status: 500 })
  }
}

export const POST = async ( req: Request) => {
  const newConfig = await req.json()
  try {
    await connectDB()
    const configs = await Configs.create(newConfig)
    return new Response(JSON.stringify(configs), { status:200 })
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}


