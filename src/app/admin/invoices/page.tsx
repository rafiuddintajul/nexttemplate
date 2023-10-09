
'use client'

import { useState, useEffect } from 'react'
import { DataTable } from '@/components/my'
import { invoiceColumns } from '@/components/utils'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const  [invoices, setInvoices] = useState()
  const router = useRouter()

  useEffect(()=>{
    async function getInvoices(){
      try {
        const res = await fetch('http://localhost:3000/api/invoices/')
        const data = await res.json()
        setInvoices(data)
      } catch (error) {
        console.log(error)
      }
    }
    getInvoices()
  },[])

  return (
    <>
      <div className="pt-5 pb-2 flex w-full pl-3 gap-2">
        <h3>Invoices</h3>
        <div className="bg-black flex items-center rounded-full w-8 hover:cursor-pointer" onClick={()=>router.push('/admin/invoices/new')}>
          <Plus className="text-white mx-auto" size={18} strokeWidth={3}/>
        </div>
      </div>
      {
        invoices
        ? (<DataTable data={invoices} columns={invoiceColumns} />)
        : <div>Loading</div>
      }
    </>
  )
}

export default Page