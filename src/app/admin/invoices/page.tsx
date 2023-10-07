
'use client'

import { useState, useEffect } from 'react'
import { DataTable } from '@/components/my'
import { invoiceColumns } from '@/components/utils'
import Link from 'next/link'

const Page = () => {
  const  [invoices, setInvoices] = useState()

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
    <section className="flex flex-1 flex-col">
      <div className="flex-col max-w-2xl h-full w-full">
        <div className="pt-5 pb-2 w-full pl-3">
          <h3>Invoices</h3>
        </div>
        {
          invoices
          ? (<DataTable data={invoices} columns={invoiceColumns} />)
          : <div>Loading</div>
        }
        
      </div>
      <div className="sticky bottom-0 flex justify-end p-2">
          <Link href="/admin/invoices/new" className="shadcn_button_default">Add Invoice </Link>
      </div>
    </section>
  )
}

export default Page