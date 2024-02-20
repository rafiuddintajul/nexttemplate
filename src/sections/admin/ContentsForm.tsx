'use client'

import { useState } from "react"
import { Button } from "@/components/ui"
import { SectionContents, AdminConfig } from "@/types"
import { Plus } from 'lucide-react';
import { ContentsSection } from "./ContentsSection"
import useSWR from "swr";

const contentsFetcher = async (url: string) => {
  const res = await fetch(`${window.location.origin}${url}`)
  const data = await res.json()
  return data
}

export const ContentsForm = () => {
  const { data, error, mutate } = useSWR<SectionContents[]>(`/api/sections`, contentsFetcher, { revalidateOnFocus: false, revalidateOnMount: true })
  const [loading, setLoading] = useState(false)

  const addSectionContent = async () => {
    setLoading(true)
    // add sectionContent and deploy to db to create section Content id
    const res = await fetch(`/api/sections`, { method:'POST', body:JSON.stringify({ contents:[] }) })
    if (res.ok) {
      if (data) {
        mutate([...data, await res.json()])
      }
    }
    setLoading(false)
  }
  
  const removeSection = async (id:string) =>{
    setLoading(true)
    // remove sectionContent and deploy to db
    const res = await fetch(`/api/sections/${id}`, { method:'DELETE' })
    if (res.ok) {
      if(data){
        mutate(data.filter(content=> content._id !== id ))
      }
    }
    setLoading(false)
  }

  const addSlide = async (id:string) => {
    setLoading(true)
    const newSlide = {
      contents: [],
      structure: "any",
      bgPic: {
        url:'',
        style:''
      }
    }
    // remove sectionContent and deploy to db
    const res = await fetch(`/api/sections/${id}`, { method:'PATCH', body: JSON.stringify(newSlide) })
    if (res.ok) {
      if(data){
        mutate(data.filter(content=> content._id !== id ))
      }
    }
    setLoading(false)
  }

  const removeSlide = async (sectionId:string, slideId:string) => {
    setLoading(true)
    const res = await fetch(`/api/contents/${slideId}`, { method:'DELETE', body: JSON.stringify({ sectionId }) })
    if (res.ok) {
      if(data){
        mutate(data.map(content=> {
          if (content._id === sectionId) {
            content.contents = content.contents.filter(slide => slide._id !== slideId)            
          }
          return content
        }))
      }
    }
    setLoading(false)
  }

  if (data){
    return <>
      {
        data.map(sectionContent=> {
          return <ContentsSection key={sectionContent._id} data={sectionContent} addSlide={addSlide} removeSlide={removeSlide} loading={loading}>
            <div className="w-full flex justify-center">
              <Button className="rounded-full h-7 p-1 my-2 bg-red-500" type="button" onClick={()=>removeSection(sectionContent._id!)} disabled={loading}>Remove Section</Button>     
            </div>
          </ContentsSection>
        })
      }
      <div className="flex justify-center border border-black bg-emerald-300">
        <Button className="rounded-full h-9 p-2 my-2" type="button" onClick={addSectionContent} disabled={loading}><Plus size={20} /></Button>
      </div>
    </>
  }
  // return button just for view
  return <div className="flex justify-center border border-black bg-emerald-300">
      <Button className="rounded-full h-9 p-2 my-2" type="button" disabled={true}><Plus size={20} /></Button>
    </div>
}

