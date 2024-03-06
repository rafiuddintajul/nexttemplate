'use client'

import Image from "next/image"
import { SlidingSection } from "../SlidingSection"
import { SectionContents } from "@/types"
import { Button, AlertDialogAction, AlertDialogCancel } from "@/components/ui"
import { WarningAlert } from "@/components/my"
import { ContentForm } from "./ContentForm"
import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { TextEditor } from "@/components/texteditor"

type ContentsSectionType = {
  data: SectionContents,
  addSlide:(id:string)=>void
  removeSlide:(id:string, slideId:string)=>void
  children?:React.ReactNode,
  loading?:boolean
}

export const ContentsSection = ({ data, addSlide, removeSlide, children, loading }:ContentsSectionType) => {
  const [ sectionContents, setSectionContents ] = useState<SectionContents>(data)
  const [edit, setEdit] = useState<string[]>([])

  return (
    <div className="relative flex flex-col justify-center mb-10">
      <SlidingSection className="flex flex-col relative min-h-[200px] overflow-hidden">
        {
          sectionContents.contents.length
          ? // whole slides displayed here
          sectionContents.contents.map((slideContents, i) => {
              if (!edit.includes(slideContents._id!)) {
                return (
                  <div key={i} className="flex flex-col justify-center h-[720px] gap-1 relative md:flex-row bg-gray-300">
                    { 
                      slideContents.bgPic?.url && <Image 
                        src={slideContents.bgPic?.url}
                        alt="mountain"
                        fill
                        className="object-cover object-center w-full h-full z-0"
                      />
                    }
                    <div className="flex flex-col justify-center py-5 px-1 h-full w-full md:container md:flex-row">
                      {
                        slideContents.contents.map((content, i) => {
                          if (content.type === 'article') {
                            if (content.article) {
                              return (
                                <div key={i} className="relative flex self-center w-full z-10 max-h-[360px] max-w-xl px-3 group/text">
                                  <div className="w-full flex flex-col h-[360px] justify-center">
                                    <TextEditor namespace={`article_${i}`}  state={content.article} editable={false} editableClassName="border-0" />
                                  </div>
                                </div>
                              )
                            }
                          } else {
                            if (content.url) {
                              return (
                                <div key={i} className="self-center relative w-[300px] h-[250px] max-w-xl md:w-full md:h-[360px]">
                                  <Image
                                    src={content.url} 
                                    alt="hiker"
                                    fill
                                    className="object-cover"
                                  />
                                </div>)
                            }
                          }
                        })
                      }
                    </div>
                    <div className="absolute top-1 left-1 h-7">
                      <Button type="button" className="text-xs h-full px-2" onClick={()=>setEdit(ids => [...ids, slideContents._id!])}>Edit</Button>
                    </div>
                  </div>)
              } else {
                return (
                  <ContentForm contents={slideContents} key={slideContents._id!} mutate={setSectionContents}>
                    <div className="absolute top-1 left-1 h-7 z-20">
                      <Button type="button" className="text-xs h-full px-2" onClick={()=>setEdit(ids => ids.filter(id=>id !== slideContents._id))}>Exit</Button>
                    </div>
                    <div className="absolute right-1 bottom-1 h-7 gap-1 flex z-20">
                      <Button type="button" className="h-full w-7 p-0" onClick={()=>addSlide(sectionContents._id!)} disabled={loading}><Plus size={12} /></Button>
                      <WarningAlert
                        header="Deleting slide" 
                        body="Are you sure? Deleted slide will not be able to be retrieved?"
                        footer={<div className="flex gap-1">
                            <AlertDialogAction onClick={()=>removeSlide(sectionContents._id!, slideContents._id!)}>Delete</AlertDialogAction>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                          </div>}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-full w-7 p-0"
                        disabled={loading}
                      >
                        <Minus size={12} />
                      </WarningAlert>
                    </div>
                  </ContentForm>)
              }
            })
          : <div className="w-full h-full slider-item">
              <div className="w-full h-full flex flex-col justify-center">
                <Button type="button" className="mx-auto max-w-32" onClick={()=>addSlide(data._id!)}>Add Slide</Button>
              </div>
            </div>
        }
      </SlidingSection>
      {children}
    </div>
  )
}
