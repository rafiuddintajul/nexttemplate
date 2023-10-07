import { connectDB } from '@/utils/database'
import Contents from '@/models/content'

export const GET = async (request: Request, { params }: any) => {

  try {
    await connectDB()
    const content = await Contents.findById(params.id).populate('author')
    if (!content) {
      return new Response('Content not found', { status: 404 })
    }
    return new Response(JSON.stringify(content), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch content', { status: 500 })
  }
}

export const PATCH = async (request: Request, { params }: any) => {
  const { title, content } = await request.json()
  try {
    await connectDB()
    const contentDB = await Contents.findById(params.id)
    if (!contentDB) {
      return new Response("Content not found", { status: 404 })
    }
    contentDB.title = title
    contentDB.content = content

    await contentDB.save()
    return new Response(JSON.stringify(contentDB), { status: 200 })
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 })
  }
}

export const DELETE = async (request: Request, { params }: any) => {
  try {
    await connectDB()
    await Contents.findByIdAndRemove(params.id)
    return new Response("Content has been deleted", { status: 200 })
  } catch (error) {
    return new Response("Fail to delete content", { status: 500 })
  }
}