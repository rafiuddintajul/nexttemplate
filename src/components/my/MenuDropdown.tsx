
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Cart } from "./Cart"
import Link from "next/link"

export const MenuDropdown = ({ children, inCart }:{ children?: React.ReactNode, inCart?:boolean }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full h-full">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-emerald-300 border-0 text-gray-900">
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0 hover:cursor-pointer" ><div className="p-2 h-full w-full rounded-md hover:text-secondary-foreground hover:bg-secondary"><Link href='/api/auth/signin?callbackUrl=/'>Sign In</Link></div></DropdownMenuItem>
          <DropdownMenuItem className="p-0 hover:cursor-pointer">
            <div className="p-2 h-full w-full rounded-md hover:text-secondary-foreground hover:bg-secondary justify-between flex group">
              <div className="my-auto">Cart</div>
              <Cart inCart={inCart} className="text-primary-foreground group-hover:text-secondary-foreground" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
