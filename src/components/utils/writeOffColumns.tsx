"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { WriteOff, ItemGroup } from "@/types"
import { DMYdate } from "@/utils"
import { ArrowUpDown } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent, Button } from "../ui"

export const writeOffColumns: ColumnDef<WriteOff>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="min-w-min max-w-fit px-0"
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    },
    cell: ({ row }) => {
      const rawDate: string = row.getValue('date')
      const date = DMYdate(new Date(rawDate))
      return <div className="h-full flex"><div className="self-start">{date}</div></div>
    }
  },
  {
    accessorKey: '_id',
    header: 'ID',
    cell: ({ row }) => {
      const id: string | undefined = row.original._id
      return <Link href={`/admin/writeoffs/${id}`} className="text-blue-600 max-w-lg break-all">{id}</Link>
    }
  },
  {
    accessorKey: 'items',
    header: 'Items',
    cell: ({ row }) => {
      const items:ItemGroup[]  = row.getValue('items')
      const itemsName:string[] = items.map(item => item.product.name)
      return <Popover>
        <PopoverTrigger className="hover:cursor-default text-start"><div className="line-clamp-2">{itemsName.join(', ')}</div></PopoverTrigger>
        <PopoverContent sideOffset={-30}><div className="text-sm">{itemsName.join(', ')}</div></PopoverContent>
      </Popover>
    }
  },
  {
    accessorKey: "reason",
    header: 'Reason',
    cell: ({ row }) => {
      const reason: string = row.getValue("reason")
      return <div className="line-clamp-2">{reason}</div>
    }
  },
]
