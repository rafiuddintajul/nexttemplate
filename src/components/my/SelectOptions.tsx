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
  value?: string,
  className?: string
}

export const SelectOptions = forwardRef(({ options, placeholder, value, onValueChange, disabled, className }:SelectOptions, ref:any) => {
  
  return (
    <Select onValueChange={onValueChange} value={value ?? undefined}>
      <SelectTrigger className={className} disabled={disabled}>
        <SelectValue placeholder={placeholder} ref={ref}/>
      </SelectTrigger>
      <SelectContent ref={(ref) => { if (!ref) return; ref.ontouchstart = (e) => { e.preventDefault(); }; }}>
        { options.map((option, index) =><div key={`name_${option}`}><SelectItem value={option}>{option}</SelectItem></div> )}
      </SelectContent>
    </Select>
  )
})

SelectOptions.displayName = 'SelectOption' //work around for eslint error for forwardRef

