
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { WriteOff } from '@/types'
import { writeOffColumns } from '@/components/utils'
import { DataTable,SelectOptions } from '@/components/my'
import { Input } from '@/components/ui'
import { Plus } from 'lucide-react'

const Page = () => {
  const [ writeOff, setWriteOff ] = useState<WriteOff[]>()
  const [ filter, setFilter ] = useState({ column:'', value: '' })
  const router = useRouter()
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
    <>
      <div className="pt-5 pb-2 w-full px-3">
        <div className="flex h-full gap-2">
          <h3>Write-Off</h3>
          <div className="bg-black flex items-center rounded-full w-8 hover:cursor-pointer" onClick={()=>router.push('/admin/writeoffs/new')}>
            <Plus className="text-white mx-auto" size={18} strokeWidth={3}/>
          </div>
        </div>
      </div>
      {writeOff
        ? <div className="w-full flex-col overflow-hidden">
          <DataTable columns={writeOffColumns} data={writeOff} filter={filter}>
            <div className="flex items-center py-4 gap-1 w-full h-full">
              <div className="h-10 flex gap-2 w-full">
                <SelectOptions className="h-full w-22" placeholder='column' options={colFilterOption.map(opt=>opt.disp)} onValueChange={selectHandler}/>
                <Input className="flex-1" placeholder="search key" value={filter.value} onChange={(e)=>setFilter({ ...filter, value:e.target.value })} />
              </div>
            </div>
          </DataTable>
        </div>
        : <div>Loading</div>
      }
    </>
  )
}

export default Page