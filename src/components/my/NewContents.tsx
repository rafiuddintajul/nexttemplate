'use client'

import { ContentData } from '@/types'
import { Form } from './Form'
import { SpinnerLoader } from '../utils'

type NewContentsProps = {
  processing: boolean,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, contentData: ContentData) => void
}

export const NewContents = ({ processing, handleSubmit }: NewContentsProps) => {

  return (
    <section className="mb-0">
      <h2 className="text-center font-bold text-sky-700 text-lg">Create New Content:</h2>
      <div className="mt-2 mb-5 px-2 border rounded-md bg-slate-50">
        <Form name={'newContent'} handleSubmit={handleSubmit} processing={processing} />
      </div>
    </section>
  )
}