'use client'

import { Button } from "../ui"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type AddDropdownProps = {
  children?: React.ReactNode,
  handleAddTextContent?: (e:React.MouseEvent<HTMLDivElement>)=>void,
  handleAddPicture?: (e:React.MouseEvent<HTMLDivElement>)=>void,
  disable?:boolean,
  className?:string,
}

export function AddContentDropdown({ handleAddTextContent, handleAddPicture, disable, className }:AddDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" className={className} disabled={disable}>Action</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleAddTextContent} disabled={disable}>Add Text Content</DropdownMenuItem>
          <DropdownMenuItem onClick={handleAddPicture} disabled={disable}>Add Picture</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}