import { connectDB } from '@/utils/database'
import Configs from '@/models/configuration'

export const GET = async (req:Request,  { params }: { params: { slug: 'AdminMainConfig' | 'ProductConfig' } }) => {
  try {
    await connectDB()
    const configs = await Configs.findOne({name : params.slug })
    // return status 200 so that it will not shown as error 404 since it requires to create new config record
    if (!configs) return new Response(JSON.stringify({ message:'settings is not yet exist' }), { status:200, statusText:'none-existence' })
    return new Response(JSON.stringify(configs), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch content', { status: 500 })
  }
}

export const PATCH = async (req:Request, { params }: { params: { slug: 'AdminMainConfig' | 'ProductConfig'  } }) => {
  const { data }:any = await req.json()
  try {
    await connectDB()
    const configs = await Configs.findOneAndUpdate({ name:params.slug }, { data })
    return new Response(JSON.stringify(configs), { status:200 })
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}