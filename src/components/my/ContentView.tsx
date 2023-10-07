import { ContentData } from '@/types'

type ContentViewProp = {
  data: Omit<ContentData, "content"> & { content:TrustedHTML },
  handleEdit: (param: string) => void,
  handleDelete?: (param: string) => void,
}

export const ContentView = ({ data, handleEdit, handleDelete }: ContentViewProp) => {
  return (
    <div>
      <h2 className="my-2 py-2 text-center font-semibold">{data.title}</h2>
      <div className="my-2" dangerouslySetInnerHTML={{__html:data.content }}>
      </div>
      <div className="flex justify-center my-2">
        <div className="px-1">
          <button className="mx-0 button border-sky-600 font-bold text-sky-600 hover:bg-sky-400 drop-shadow-sm" onClick={() => handleEdit(data.id!)}>Edit</button>
        </div>
        <div className="px-1">
          <button className="mx-0 button border-red-600 font-bold text-red-600 hover:bg-red-400 drop-shadow-sm" onClick={() => handleDelete && handleDelete(data.id!)} >Delete</button>
        </div>
      </div>
    </div>
  )
}
