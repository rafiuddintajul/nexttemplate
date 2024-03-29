'use client'

import {useState, forwardRef, Dispatch, SetStateAction } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
type DateInputProps = {
  date: Date|undefined,
  addDate?: (date:Date|undefined) =>void,
} & React.HTMLAttributes<HTMLButtonElement>

export const DateInput = forwardRef(({ date, addDate, ...props }:DateInputProps, ref:any) => {
  const [dispDate, setDispDate] = useState<Date|undefined>(date)
  
  const selectHandler = (selectedDate:Date|undefined) => {
    setDispDate(selectedDate)
    addDate && addDate(selectedDate)
  }

  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `w-[280px] justify-start text-left font-normal ${props.className}`,
            !dispDate && "text-muted-foreground"
          )}
          ref={ref}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dispDate ? format(dispDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={dispDate}
          onSelect={selectHandler}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
})

DateInput.displayName = 'DateInput'
