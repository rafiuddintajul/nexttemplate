import { SubmitCallbacks, ContentData } from "@/types"

import { Form } from "./Form"
import { ContentView } from "./ContentView"
import { ContentArray } from "./ContentContainer"
import { SpinnerLoader } from "../utils"

type ExistingContentProps = {
  data: ContentArray,
  handleEdit: (param: string) => void,
  handleCancel: (param: string) => void,
  handleDelete?: (param: string) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, contentData:ContentData, callback?: SubmitCallbacks) => void
}

export const ExistingContent = ({ data, handleEdit, handleCancel, handleSubmit, handleDelete }: ExistingContentProps) => {

  return (
    <section className="py-4">
      <h2 className="text-center font-bold text-sky-700 text-lg">Contents:</h2>
      {data.length > 0 
      ? data.map((content) => {
        return (
          <div key={content.id} className="mt-2 mb-5 px-2 border rounded-md bg-slate-50">
            {
              content.edit
                ? (<Form
                  name={'editContent'}
                  data={{ id: content.id, title: content.title, content: content.content }}
                  processing={content.processing}
                  handleSubmit={handleSubmit}
                  handleCancel={handleCancel}
                />)
                : (<ContentView
                  data={{ id: content.id, title: content.title, content: content.content }}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />)
            }
          </div>
        )
      })
      : (<SpinnerLoader  style={{ maxWidth: "50px", backgroundColor: "transparent" }} />)
      }
    </section>
  )
}
