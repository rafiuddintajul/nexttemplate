'use client'

import { SessionUser, SubmitCallbacks, ContentData } from "@/types"

import { useState, useEffect } from "react"
import { useSession } from 'next-auth/react'

import { ExistingContent } from "./ExistingContents"
import { NewContents } from "./NewContents"

export type ContentArray = {
  edit: boolean,
  processing: boolean,
  id: string,
  title: string,
  content: string
}[]

export const ContentContainer = () => {
  const [newContentProcessing, setNewContentProcessing] = useState(false)
  const [data, setData] = useState<ContentArray | []>([])
  const { data: session }: { data: SessionUser | null } = useSession()

  useEffect(() => {
    async function getContent() {
      const res = await fetch('api/content', { method: 'GET' })
      if (res.ok) {
        const dbContents = await res.json()
        const content = dbContents.map((content: any) => {
          const data = { ...content, id: content._id, edit: false, processing: false }
          delete data.__v
          delete data._id
          return data
        })
        setData(content)
      }
    }

    getContent()

  }, [])

  const handleEdit = (param: string) => {
    setData(prev => {
      return prev.map(content => {
        if (content.id === param) {
          return { ...content, edit: true }
        }
        return content
      })
    })
  }

  const handleCancel = (param: string) => {
    setData(prev => {
      return prev.map(content => {
        if (content.id === param) {
          return { ...content, edit: false }
        }
        return content
      })
    })
  }

  const handleDelete = async (param: string) => {
    const isConfirmed = confirm("You are about to delete a content. Are you sure to proceed?")
    if (isConfirmed) {
      try {
        await fetch(`api/content/${param}`, {
          method: 'DELETE'
        })
        console.log('pass point 1')
        setData(prev => prev.filter(content => content.id !== param))
      } catch (error) {
        console.log('Error delete content')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, contentData: ContentData, callback: SubmitCallbacks | undefined = undefined) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      name: string,
    }
    const { name } = target

    const { content, id: contentId, title } = contentData
    if (!title || !content) return

    if (name === 'newContent') {
      // submit handler for create new content
      setNewContentProcessing(true)
      try {
        const res = await fetch('api/content/new', {
          method: 'POST',
          body: JSON.stringify({
            author: session?.user?.id,
            title: title,
            content: content
          })
        })
        if (res.ok) {
          // do callback
          const newContent = await res.json()
          newContent.id = newContent._id
          delete newContent._id
          setData(prev => [...prev, newContent])
          callback && callback.success?.()
        }
      } catch (error) {
        callback && callback.failed?.()
      } finally {
        setNewContentProcessing(false)
      }
    } else {
      // Submit handler for edit content
      // Change processing view
      setData(prev => {
        return prev.map(existingContent => {
          if (existingContent.id === contentId) return { ...existingContent, processing: true }
          return existingContent
        })
      })
      try {
        const res = await fetch(`/api/content/${contentId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            title: title,
            content: content
          })
        })
        if (res.ok) {
          setData(prev => {
            return prev.map(existingContent => {
              if (existingContent.id === contentId) return { ...existingContent, processing: false, edit: false, title: title, content: content }
              return existingContent
            })
          })
        }
      } catch (error) {
        callback && callback.failed?.()
      }
    }
  }

  return (
    <>
      <ExistingContent data={data} handleEdit={handleEdit} handleCancel={handleCancel} handleSubmit={handleSubmit} handleDelete={handleDelete} />
      <NewContents handleSubmit={handleSubmit} processing={newContentProcessing} />
    </>
  )
}
