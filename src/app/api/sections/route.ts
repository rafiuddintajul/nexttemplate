import { connectDB } from '@/utils/database'
import WebSections from '@/models/webSections'
import Contents from '@/models/contents'

export const GET = async () => {
  try {
    await connectDB()
    const contents = await WebSections.find().populate({
      path:'contents',
      model: Contents
    })
    return new Response(JSON.stringify(contents), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch content', { status: 500 })
  }
}

export const POST = async ( req: Request) => {
  const newSection = await req.json()
  try {
    await connectDB()
    const contents = await WebSections.create(newSection)
    return new Response(JSON.stringify(contents), { status:200 })
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}

