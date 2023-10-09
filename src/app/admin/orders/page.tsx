
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Order } from '@/types'
import { orderColumns } from '@/components/utils'
import { SelectOptions } from '@/components/my'
import { DataTable } from '@/components/my'
import { Plus } from 'lucide-react'

const Page = () => {
  const [select, setSelect] = useState({ column: 'status', value: 'all' })
  const [orders, setOrders] = useState<Order[]>()
  const router = useRouter()
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
    <>
      <div className="pt-5 pb-2 flex w-full pl-3 gap-2">
        <h3>Orders</h3>
        <div className="bg-black flex items-center rounded-full w-8 hover:cursor-pointer" onClick={()=>router.push('/admin/orders/new')}>
          <Plus className="text-white mx-auto" size={18} strokeWidth={3}/>
        </div>
      </div>
      {orders
        ? <div className="w-full flex-col overflow-hidden">
          <DataTable columns={orderColumns} data={orders} filter={select} >
            <SelectOptions options={status} placeholder="filter status" onValueChange={(value: string) => setSelect(select => ({ ...select, value }))} />
          </DataTable>
        </div>
        : <div>Loading</div>
      }
    </>
  )
}

export default Page