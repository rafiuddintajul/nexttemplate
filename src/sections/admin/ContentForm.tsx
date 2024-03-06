'use client'

import React, { useState } from "react"
import { Button, Input } from "@/components/ui"
import { Minus } from "lucide-react"
import Image from "next/image"
import { AddContentDropdown } from "@/components/my"
import { TextEditor } from "@/components/texteditor"
import { CustomizableContent, PicContent, TextContent } from "@/types"
import { SectionContents } from "@/types"


type ContentFormProps = {
  contents?: CustomizableContent,
  mutate: React.Dispatch<React.SetStateAction<SectionContents>>,
  children?:React.ReactNode
}

const emptyContent = { contents:[], bg: { url: '', style:'' } }

export const ContentForm = ({ contents=emptyContent, mutate, children }:ContentFormProps) => {
  const [ customizableContents, setCustomizableContents] = useState(contents)
  const [ loading, setLoading ] = useState(false)

  const update = (newContent:CustomizableContent) => {
    mutate(sectionContents => {
      sectionContents.contents = sectionContents.contents.map(content => {
        if (content._id === newContent._id) {
          return newContent
        }
        return content
      })
      return sectionContents
    })
    setCustomizableContents(newContent)
  }

  const savePic = async ( url:string, i?:number ) => {
    if (!url.startsWith('/')) {
      if (!url.startsWith('https://') && !url.startsWith('http://')) {
        url = '/'+ url
      }
    }
    const newContents = structuredClone(customizableContents)
    if (i !== undefined) {
      const picContent = newContents.contents[i] as PicContent
      picContent.url = url
    } else {
      newContents.bgPic && (newContents.bgPic.url = url)
    }
    const res = await fetch(`${window.location.origin}/api/contents/${customizableContents._id}`, { method: 'PATCH', body:JSON.stringify(newContents)})
    if (res.ok) {
      return res
    }
    return undefined
  }
  const saveArticle = async (value:string, i:number) => {
    const newContents = structuredClone(customizableContents)
    const articleContent = newContents.contents[i] as TextContent
    articleContent.article = value
    const res = await fetch(`${window.location.origin}/api/contents/${customizableContents._id}`, { method: 'PATCH', body:JSON.stringify(newContents)})
    if (res.ok) {
      return res
    }
    return undefined
  }

  const picHandler = async (e:React.FormEvent, i?:number) => {
    e.preventDefault()
    setLoading(true)
    const input = e.target as HTMLFormElement
    if (i !== undefined) {
      const url = input.url.value
      const res = await savePic(url, i)
      if (res) {
        update(await res.json())
      } else {
        // show error message
      }
    } else {
      const url = input.bgUrl.value
      const res = await savePic(url)
      if (res) {
        update(await res.json())
      } else {
        // show error message
      }
    }
    setLoading(false)
  }

  const articleHandler = async (value:string, i:number) => {
    setLoading(true)
    const res = await saveArticle(value,i)
    if (res) {
      update(await res.json())
    } else {
      // show error message
    }
    setLoading(false)
  }

  const addBlock = async (type:'article'|'picture') => {
    setLoading(true)
    const blocks = [{ type:'article', article:undefined, style:'' }, { type:'picture', url:'', style:'' }]
    const newBlock = blocks.find(block => block.type === type)
    const newContents = { ...customizableContents, contents:[...customizableContents.contents, newBlock ] }
    const res = await fetch(`${window.location.origin}/api/contents/${customizableContents._id}`, { method: 'PATCH', body:JSON.stringify(newContents)})
    res.ok && update(await res.json())
    setLoading(false)
  }

  const removeBlock = async (remI:number) => {
    setLoading(true)
    const newContents = structuredClone(customizableContents)
    newContents.contents = newContents.contents.filter((c,i) => i !== remI)
    const res = await fetch(`${window.location.origin}/api/contents/${customizableContents._id}`, { method: 'PATCH', body:JSON.stringify(newContents)})
    res.ok && update(await res.json())
    setLoading(false)
  }


  const onImageError = async (data: { i:number, type: 'pic' } | { type: 'bgPic' }) => {
    setLoading(true)
    const errUrl = 'https://img.freepik.com/free-vector/404-error-background-flat-style_23-2147763208.jpg?w=826&t=st=1703569998~exp=1703570598~hmac=302024de2bd479b20cd92463c09bfbe9192c87b61494313911d7d0804a72e12f'
    if(data.type === 'pic'){
      savePic(errUrl, data.i)
    } else {
      savePic(errUrl)
    }
    setLoading(false)
  }

  return <div className="flex flex-col justify-center h-[720px] gap-1 relative md:flex-row group/bg bg-gray-300">
    { 
      customizableContents.bgPic?.url && <Image 
        src={customizableContents.bgPic?.url}
        alt="mountain"
        fill
        className="object-cover object-center w-full h-full z-0"
        onError={()=>onImageError({type:'bgPic'})}
      />
    }
    <div className="z-10 flex flex-col justify-center py-5 px-1 h-full w-full md:container md:flex-row">
      {
        customizableContents.contents.map((customizableContent,i) => {
          if (customizableContent.type === 'article') {
            return <div key={i} className="relative flex self-center w-full z-10 max-h-[360px] max-w-xl px-3 group/text">
              <div className="w-full flex flex-col h-[360px] justify-center">
                <TextEditor namespace="content" state={customizableContent.article} onSave={(data)=>articleHandler(data,i)} loading={loading} editableClassName="max-h-[360px]" />
              </div>
              <div className="hidden absolute -bottom-7 group-hover/text:flex group-active/text:flex gap-1 justify-center w-full">
                <Button type="button" className="h-7 w-7 rounded-full p-0" onClick={()=>removeBlock(i)} disabled={loading}><Minus size={12} /></Button>
              </div>
            </div>
          }
          return <div key={i} className="self-center relative flex flex-col justify-center w-[300px] h-[250px] max-w-xl md:w-full md:h-[360px] group/pic">
            {
              customizableContent.url ? <Image
                src={customizableContent.url}
                alt="hiker"
                fill
                className="object-cover z-20"
                onError={()=>onImageError({ i, type: 'pic'})}
              /> :
              <div className="absolute h-full w-full z-20 border rounded-md flex flex-col justify-center border-gray-500">
              </div>
            }
            <div className="hidden absolute -bottom-7 group-hover/pic:flex group-active/pic:flex gap-1 justify-center w-full">
              <form className="flex gap-1" onSubmit={(e)=>picHandler(e, i)}>
                <Input name="url" placeholder="Add/Change picture url" className="h-7 max-w-[200px]" /><Button type="submit" className="h-7" disabled={loading}>save</Button>
              </form>
              <Button type="button" className="h-7 w-7 rounded-full p-0" onClick={()=>removeBlock(i)} disabled={loading}><Minus size={12} /></Button>
            </div>
          </div>
        })
      }
      {
        // Add article/pic block
        customizableContents.contents.length < 2 && 
        <div className="flex gap-1 self-end absolute top-1 right-1 h-7">
          <AddContentDropdown className="text-xs px-2 h-full" handleAddTextContent={()=>addBlock('article')} handleAddPicture={()=>addBlock('picture')} />
        </div>
      }
      <div className="flex absolute bottom-6 h-7 w-full gap-1">
        <div className="h-full w-full relative flex justify-center">
          <form onSubmit={picHandler} className="w-full hidden group-hover/bg:flex group-active/bg:flex justify-center gap-1">
            <Input name="bgUrl" className="h-7 max-w-[250px]" height={24} placeholder="add background image url" />
            <Button type="submit" className="h-7" disabled={loading}>Add</Button>
          </form>
        </div>
      </div>
    </div>
    { children }
  </div>
}

