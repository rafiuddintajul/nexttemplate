
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Order } from '@/types'
import { orderColumns } from '@/components/utils'
import { SelectOptions } from '@/components/my'
import { DataTable } from '@/components/my'
import { Plus } from 'lucide-react'

const Page = () => {
  const [loading, setLoading] = useState(true)
  const [select, setSelect] = useState({ column: 'status', value: 'all' })
  const [orders, setOrders] = useState<Order[]>([{
    name: '',
    address: '',
    items: [ ],
    date: new Date(),
    total: 0,
    status: '',
    description: ''
  }])
  const router = useRouter()
  const status = ['all', 'new', 'shipping', 'shipped']

  useEffect(() => {
    async function getOrders() {
      try {
        const res = await fetch('/api/orders/')
        const data = await res.json()
        setLoading(false)
        setOrders(data)
      } catch (error) {
        console.log(error)
      }
    }
    getOrders()
  }, [])

  return (
    <div className="pt-5 pb-2 flex w-full pl-3 gap-2 justify-center">
      <div className="flex flex-col">
        <div className="container">
          <p className="text-sm mt-5 text-center">Manage orders received. Orders are automatically registered on user&apos;s purchase, but to add manually click on the big plus button above</p>
          <div className="flex-col overflow-hidden max-w-4xl self-center container">
            <DataTable columns={orderColumns} data={orders} filter={select} loading={loading} >
              <SelectOptions options={status} placeholder="filter status" onValueChange={(value: string) => setSelect(select => ({ ...select, value }))} className="py-2 max-w-md" />
            </DataTable>
          </div>
          <div className="bg-black flex items-center rounded-full w-10 hover:cursor-pointer absolute top-1 right-1 h-10" onClick={()=>router.push('/admin/orders/new')}>
            <Plus className="text-white mx-auto" size={18} strokeWidth={3}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page