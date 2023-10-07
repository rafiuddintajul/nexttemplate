import { connectDB } from "@/utils/database"
import Contents from "@/models/content"

export const GET = async (request: any) => {

  try {
    await connectDB()
    const contents = await Contents.find({}).populate('author')
    
    return new Response(JSON.stringify(contents), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 })
  }
}