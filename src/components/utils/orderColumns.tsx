"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { Order } from "@/types"
import { DMYdate } from "@/utils"
import { ArrowUpDown } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent, Button } from "../ui"

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="min-w-min max-w-fit"
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
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const id: string | undefined = row.original._id
      const name: string = row.getValue('name')
      return <Link href={`/admin/orders/${id}`} className="text-blue-600">{name}</Link>
    }
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      const address: string = row.getValue('address')
      return <Popover>
        <PopoverTrigger className="hover:cursor-default"><div className="line-clamp-2">{address}</div></PopoverTrigger>
        <PopoverContent sideOffset={-30}><div className="text-sm">{address}</div></PopoverContent>
      </Popover>
    }
  },
  {
    accessorKey: "status",
    header: 'Status',
    cell: ({ row }) => {
      const status: string = row.getValue("status")
      const newStatus = status === 'new' ? true : false
      const statusNode = newStatus ? status.toUpperCase() : status
      const style = newStatus ? "text-green-500 font-bold" : ""
      return <div className={style}>{statusNode}</div>
    }
  },
]
