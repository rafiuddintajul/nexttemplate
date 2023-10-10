"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { Invoice, Product } from "@/types"
import { DMYdate } from "@/utils"
import { ArrowUpDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger, Button } from "../ui"

export const invoiceColumns: ColumnDef<Invoice>[] = [
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
    accessorKey: 'no',
    cell: ({ row }) => {
      const no: string = row.getValue('no')
      const id: string | undefined = row.original._id
      return <Link href={`/admin/invoices/${id}`} className="text-blue-600">{no}</Link>
    }
  },
  {
    accessorKey: 'items',
    cell: ({ row }) => {
      const items: { [key: string]: any, product: Product, quantity: number }[] = row.getValue('items')
      const itemsName = items.map(item => item.product.name)
      return <>
        <Popover>
          <PopoverTrigger className="hover:cursor-default"><div className="text-start line-clamp-2">{itemsName.join(', ')}</div></PopoverTrigger>
          <PopoverContent sideOffset={-30}><div className="text-sm">{itemsName.join(', ')}</div></PopoverContent>
        </Popover>
      </>
    }
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      const total: number = row.getValue("total")
      return <div className="flex-col justify-center w-full">
        <div>RM</div>
        <div>{total.toFixed(2)}</div>
      </div>
    }
  },
]
