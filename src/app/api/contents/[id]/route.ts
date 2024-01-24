import { connectDB } from '@/utils/database'
import Contents from '@/models/contents'
import WebSections from '@/models/webSections'

export const PATCH = async (req:Request, { params }:{ params: { id:string }}) => {
  const patchData = await req.json()
  try {
    await connectDB()
    // const updatedContent = {
    //   "type.$": patchData.type,
    //   "article.$": patchData.article,
    //   "url.$": patchData.url,
    //   "style.$": patchData.style,
    // }
    // const contents = await Contents.findOneAndUpdate({ _id: params.id, "contents._id":patchData._id }, { "$set": updatedContent }, { new:true })
    const contents = await Contents.findOne({ _id:params.id })
    if (patchData.bgPic) {
      contents.bgPic = patchData.bgPic
    }
    if (patchData.contents) {
      contents.contents = patchData.contents
    }

    await contents.save()
    return new Response(JSON.stringify(contents), { status:200 })
    
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}

export const DELETE = async (req:Request, { params }:{ params: { id: string } })=> {
  const data = await req.json()
  try {
    await connectDB()
    const content = await Contents.findByIdAndDelete(params.id)
    if (!content) {
      throw new Error(`Content ${params.id} could not be found.`)
    }
    const section = await WebSections.findById(data.sectionId)
    if (!section) {
      throw new Error(`Section ${params.id} could not be found.`)
    }

    section.contents = section.contents.filter((content:any) => content.toString() !== params.id)
    await section.save()

    return new Response(`Content ${params.id} has been deleted.`,{ status:200})
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(error.message),{status:500})
    }
    return new Response(JSON.stringify(error),{ status:500 })
  }
}