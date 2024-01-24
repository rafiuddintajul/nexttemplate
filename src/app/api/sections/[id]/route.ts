import { connectDB } from '@/utils/database'
import WebSections from '@/models/webSections'
import Contents from '@/models/contents'

export const GET = async (req:Request, { params }:{ params: { id: string } }) => {
  try {
    await connectDB()
    const contents = await WebSections.findById(params.id)
    return new Response(JSON.stringify(contents), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch content', { status: 500 })
  }
}

export const PATCH = async (req:Request, { params }:{ params: { id:string }}) => {
  const patchData = await req.json()
  try {
    await connectDB()

    const newContents = await Contents.create(patchData)
    const section = await WebSections.findOne({ _id: params.id })
    section.contents.push(newContents)
    await section.save()
    return new Response(JSON.stringify(section), { status:200 })
    
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}

export const DELETE = async (req:Request, { params }:{ params: { id: string } })=> {
  try {
    await connectDB()
    const deleteSection = await WebSections.findByIdAndDelete(params.id)
    if (!deleteSection) {
      throw new Error(`Section ${params.id} could not be found.`)
    }

    return new Response(`Section ${params.id} has been deleted.`,{ status:200})
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message),{status:500})
    }
    return new Response(JSON.stringify(error),{ status:500 })
  }
}