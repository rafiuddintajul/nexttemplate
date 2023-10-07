
'use client'

import { Order } from '@/types'
import { orderColumns } from '@/components/utils'
import Link from 'next/link'
import { SelectOptions } from '@/components/my'
import { useState, useEffect } from 'react'
import { DataTable } from '@/components/my'

const Page = () => {
  const [select, setSelect] = useState({ column: 'status', value: 'all' })
  const [orders, setOrders] = useState<Order[]>()
  const status = ['all', 'new', 'shipping', 'shipped']

  useEffect(() => {
    async function getOrders() {
      try {
        const res = await fetch('http://localhost:3000/api/orders/')
        const data = await res.json()
        setOrders(data)
      } catch (error) {
        console.log(error)
      }
    }
    getOrders()
  }, [])

  return (
    <section className="flex flex-1 flex-col justify-center">
      <div className="flex-col max-w-2xl w-full h-full">
        <div className="pt-5 pb-2 w-full pl-3">
          <h3>Orders</h3>
        </div>
        {orders
          ? <div className="w-full flex-col overflow-hidden">
            <DataTable columns={orderColumns} data={orders} filter={select} >
              <SelectOptions options={status} placeholder="filter status" onValueChange={(value: string) => setSelect(select => ({ ...select, value }))} />
            </DataTable>
          </div>
          : <div>Loading</div>
        }

      </div>
      <div className="sticky bottom-0 flex justify-end p-2">
        <Link href="/admin/orders/new" className="shadcn_button_default">Add Order</Link>
      </div>
    </section>
  )
}

export default Page