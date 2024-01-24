import React from "react"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui"

type Menu = {
  dispMenu:React.ReactNode,
  onClick?:(e:React.MouseEvent) => void
}

type GroupMenu = {
  label:string,
  menu:Menu[]
}

type DropdownProps = {
  display:string | React.ReactNode,
  options?: GroupMenu[]|Menu[],
  children?: React.ReactNode
}


export const Dropdown = ({ display, options, children }:DropdownProps) => {
  const dispStr = typeof display === 'string'
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={!dispStr}>{ display }</DropdownMenuTrigger>
      <DropdownMenuContent>
        {options && options.map((option, i) => {
          if('label' in option) {
            return <>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              { option.menu.map((item)=><DropdownMenuItem key={`${option.label}_${i}`} onClick={item.onClick}>{item.dispMenu}</DropdownMenuItem>) }
            </>
          }
          return <DropdownMenuItem key={i} onClick={option.onClick}>{option.dispMenu}</DropdownMenuItem>
        })}
        { children && children }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
