'use client'

import { useState, useEffect } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  filter?: { column:string, value: string },
  children?: React.ReactNode,
  tableClass?: {
    [cellId:string]: string|undefined,
    headerRow?:string,
    bodyRow?:string,
  }
}

export const DataTable = <TData, TValue>({ columns, data, filter, children, tableClass}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount:20,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  })

  useEffect(()=> {
    if (filter) {
      const col = table.getAllColumns().find(colData=>colData.id === filter.column)
      if (col) {
        if (filter.value !== 'all') {
          return table.getColumn(filter.column)?.setFilterValue(filter.value)
        }
        return table.getColumn(filter.column)?.setFilterValue(undefined)
      } 
    }
  }, [filter])


  return (
    <div className="rounded-md border">
      <div className="flex items-center px-3 py-4">
        { children }
      </div>
      <Table className="overflow-hidden">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
            <TableRow key={headerGroup.id} className={tableClass?.headerRow ?? ""}>
              {headerGroup.headers.map((header:any) => {
                return (
                  <TableHead key={header.id} className={tableClass ? tableClass[header.id+'Head'] ??  "" : "" } >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          )})}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={tableClass?.bodyRow ?? ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={"relative " + (tableClass ? tableClass[cell.id+'Cell'] ??  "" : "")}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

