import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import { forwardRef } from "react"

type SelectOptions = {
  placeholder?:string,
  options: string[],
  defaultValue?: string,
  disabled?: boolean,
  onValueChange?: (value:string) => void,
  className?: string
}

export const SelectOptions = forwardRef(({ options, placeholder, onValueChange, defaultValue, disabled, className }:SelectOptions, ref:any) => {
  
  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange} >
      <SelectTrigger className={className} disabled={disabled}>
        <SelectValue placeholder={placeholder} ref={ref}/>
      </SelectTrigger>
      <SelectContent ref={(ref)=>{ if(!ref) return; ref.ontouchstart = (e) =>{e.preventDefault()} }}> {/* this line to prevent certain device (touchevent) to propagate event */}
        { options.map((option, index) =><div key={`name_${option}`} onClick={e=>e.stopPropagation()}><SelectItem  value={option}>{option}</SelectItem></div> )}
      </SelectContent>
    </Select>
  )
})