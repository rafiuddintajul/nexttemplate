
'use client'

import { WriteOff } from '@/types'
import { writeOffColumns } from '@/components/utils'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { DataTable,SelectOptions } from '@/components/my'
import { Input } from '@/components/ui'

const Page = () => {
  const [ writeOff, setWriteOff ] = useState<WriteOff[]>()
  const [ filter, setFilter ] = useState({ column:'', value: '' })
  useEffect(()=> {
    async function getOrders(){
      try {
        const res = await fetch('http://localhost:3000/api/writeoffs/')
        const data = await res.json()
        setWriteOff(data)
      } catch (error) {
        console.log(error)
      }
    }
    getOrders()
  },[])

  const colFilterOption = [
    { disp: 'ID', value: '_id'},
    { disp: 'Reason', value: 'reason'}
  ]

  const selectHandler = (value:string) => {
    const column = colFilterOption.find(opt => opt.disp === value)?.value
    if (column) {
      setFilter({...filter, column })
    }
  }
  
  return (
    <section className="flex flex-1 flex-col justify-center">
      <div className="flex-col max-w-2xl w-full">
        <div className="pt-5 pb-2 w-full pl-3">
          <h3>Write-Off</h3>
        </div>
        {writeOff
          ? <div className="w-full flex-col overflow-hidden">
            <DataTable columns={writeOffColumns} data={writeOff} filter={filter}>
              <div className="flex items-center py-4 gap-1 w-full">
                <SelectOptions className="flex-1" placeholder='column' options={colFilterOption.map(opt=>opt.disp)} onValueChange={selectHandler}/>
                <Input placeholder="search key" value={filter.value} onChange={(e)=>setFilter({ ...filter, value:e.target.value })} />
              </div>
            </DataTable>
          </div>
          : <div>Loading</div>
        }
        <div className="sticky bottom-0 flex justify-end p-2">
          <Link href="/admin/writeoffs/new" className="shadcn_button_default">Add WriteOff</Link>
        </div>
      </div>
    </section>
  )
}

export default Page