import { connectDB } from "@/utils/database"
import Contents from "@/models/content"

type ContentData = {
  userId: string,
  title: string,
  content: string,
}

export const POST = async (req: Request) => {
  const { userId, title, content }:ContentData = await req.json()

  try {
    await connectDB()
    const newContent = new Contents({ author: userId, title, content })

    await newContent.save()
    return new Response(JSON.stringify(newContent), { status: 201 })
  } catch (error) {
    return new Response("Failed to create new prompt", { status: 500 })
  }
}