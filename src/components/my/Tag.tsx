import { forwardRef } from "react"
import { X } from "lucide-react"

type TagProps = {
  name: string,
  removeable?: boolean,
  onRemove?: (tag:string) => void,
  className?:string,
} & React.HTMLAttributes<HTMLDivElement>

export const Tag = forwardRef<HTMLDivElement, TagProps>(({ name, className, removeable=false, onRemove, ...props }, ref) => {
  const handleRemove = (e:React.MouseEvent) => {
    e.stopPropagation()
    onRemove?.(name)
  }

  return (
    <div ref={ref} className={`flex border border-gray-400 rounded-sm p-1 text-xs ${className ?? ''}`} {...props} >
      { removeable && <div className="bg-gray-200 rounded-full my-auto p-0.5 mr-1" onClick={handleRemove}><X size={10} /></div>}
      {name}
    </div>
  )
})