"use client"

import { CommandGroup, CommandItem, CommandList, CommandInput } from "@/components/ui"
import { Command as CommandPrimitive } from "cmdk"
import { useState, useRef, useCallback, forwardRef, type KeyboardEvent, type Dispatch, type SetStateAction } from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export type Option<T = any > = { label:string, value:T }

type AutoCompleteProps<T> = {
  options: Option<T>[] // customize this options
  emptyMessage: React.ReactNode
  value?: Option<T>,
  onValueChange?: (value: Option<T>) => void
  isLoading?: boolean
  disabled?: boolean
  placeholder?: string,
  checkOnSelected?: boolean,
  allowNewValue?:boolean,
  inputClassName?:string,
} & React.HTMLAttributes<HTMLDivElement>

export const InputAutoComplete = <T,>({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  disabled,
  isLoading = false,
  checkOnSelected = false,
  allowNewValue = false,
  inputClassName,
  ...props
}: AutoCompleteProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isOpen, setOpen] = useState(false)
  const [selected, setSelected] = useState<Option<T>>(value as Option<T>)
  const [inputValue, setInputValue] = useState<string>(value?.label || "")

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (!input) {
        return
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true)
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find((option) => option.label === input.value)
        if (optionToSelect) {
          setSelected(optionToSelect)
          onValueChange?.(optionToSelect)
        } else if(allowNewValue) {
          // handling to add new value
          setSelected({ label:input.value, value:input.value as any })
          onValueChange?.({ label:input.value, value:input.value as any })
        }
      }

      if (event.key === "Escape") {
        input.blur()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen, options, onValueChange]
  )

  const handleBlur = useCallback(() => {
    setOpen(false)
    setInputValue(selected?.label)
    // handling to add new value
    if (allowNewValue) {
      const input = inputRef.current
      if (input) {
        setSelected({ label:input.value, value:input.value as T })
        onValueChange?.({ label:input.value, value:input.value as T })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      setInputValue(selectedOption.label)

      setSelected(selectedOption)
      onValueChange?.(selectedOption)

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur()
      }, 0)
    },
    [onValueChange]
  )

  return (
    <CommandPrimitive onKeyDown={handleKeyDown} {...props}>
      <div className="border-b-0 h-full grid items-center">
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={isLoading ? undefined : setInputValue}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`text-base ${inputClassName}`}
        />
      </div>
      <div className="relative">
        {isOpen ? (
          <div className="absolute top-0 z-10 w-full rounded-xl bg-stone-50 outline-none animate-in fade-in-0 zoom-in-95">
            <CommandList className="ring-1 ring-slate-200 rounded-lg">
              {isLoading ? (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    {/* create custom loading here */}
                  </div>
                </CommandPrimitive.Loading>
              ) : null}
              {options.length > 0 && !isLoading ? (
                <CommandGroup >
                  {options.map((option, i) => {
                    const isSelected = selected?.value === option.value
                    return (
                      <CommandItem
                        key={`${option.label}_${i}`}
                        value={option.label}
                        onMouseDown={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                        }}
                        onSelect={() => handleSelectOption(option)}
                        className={cn("flex items-center gap-2 w-full", checkOnSelected ? !isSelected ? "pl-8" : null : "pl-8")}
                      >
                        {checkOnSelected && isSelected ? <Check className="w-4" /> : null}
                        {option.label}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              ) : null}
              {!isLoading ? (
                <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-sm text-center" >
                    {emptyMessage}
                </CommandPrimitive.Empty>
              ) : null}
            </CommandList>
          </div>
        ) : null}
      </div>
    </CommandPrimitive>
  )
}
