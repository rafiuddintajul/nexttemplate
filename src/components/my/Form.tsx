'use client'

import { SubmitCallbacks, ContentData } from "@/types"

import { useState } from "react"

type FormProp = {
  data?: ContentData,
  name: string,
  processing: boolean,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>,contentData:ContentData, callback?: SubmitCallbacks) => void,
  handleCancel?: (param: string) => void
}

export const Form = ({ data, name, processing, handleSubmit, handleCancel }: FormProp) => {
  const [contentData, setContentData] = useState<ContentData>(data ?? { title: '', content: '' })

  const onSuccess = () => {
    if (!data) {
      setContentData({ title: '', content: '' })
    }
  }

  return (
    <form name={name} onSubmit={(e) => handleSubmit(e, contentData, { success: onSuccess })}>
      <input type="hidden" id="contentId" name="contentId" value={`${data?.id?.toString()}` ?? ''} />
      <input className="my-2 py-2 w-full rounded-md text-center font-semibold bg-neutral-200 focus-within:bg-white" name="title" value={contentData?.title ?? ''} onChange={(e) => setContentData({ ...contentData, title: e.target.value })} placeholder='New Title...' required />
      <div className="flex justify-center my-2 py-2">
        {data && handleCancel && (
          <div className="px-1">
            <button type="button" className="button border-yellow-600 font-bold text-yellow-600 hover:bg-yellow-400 drop-shadow-sm" onClick={() => handleCancel(data.id!)}>
              Cancel
            </button>
          </div>
        )}
        <div className="px-1">
          <button type="submit" className="button border-green-600 font-bold text-green-600 hover:bg-green-200 drop-shadow-sm" disabled={processing}>
            {processing ? 'Processing' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  )
}
