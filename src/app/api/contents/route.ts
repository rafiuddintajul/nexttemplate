import { connectDB } from '@/utils/database'
import CustomizableContents from '@/models/webSections'
import Contents from '@/models/contents'

export const GET = async () => {
  try {
    await connectDB()
    const contents = await CustomizableContents.find().populate({
      path: 'contents',
      model: Contents,
    })
    return new Response(JSON.stringify(contents), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch content', { status: 500 })
  }
}

export const POST = async ( req: Request) => {
  const newContents = await req.json()
  try {
    await connectDB()
    const contents = await CustomizableContents.create(newContents)
    return new Response(JSON.stringify(contents), { status:200 })
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
