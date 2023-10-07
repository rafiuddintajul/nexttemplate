'use client'

import { Tabs } from "@/components/my"
import { useRouter } from "next/navigation"

type AdminNavProps = {
  currentPath: string
}

export const AdminNav = ({ currentPath }: AdminNavProps) => {
  const router = useRouter()

  const style = (tab: string) => {
    const defaultClass = "w-1/5 bg-white flex items-center justify-center border border-black rounded-t-lg text-sm -ml-px -mb-px hover:cursor-pointer"
    if (tab === currentPath) return defaultClass + " border_b_white"
    return defaultClass
  }
  const tabs = [
    { name: 'Main', className: style('main') },
    { name: 'Invoices', className: style('invoices') },
    { name: 'Orders', className: style('orders') },
    { name: 'Products', className: style('products') },
    { name: 'Writeoffs', className: style('writeoffs') }
  ]

  const handler = (tab: string) => {
    if (tab === 'Main') {
      return router.push('/admin/')
    }
    return router.push('/admin/' + tab.toLowerCase())
  }

  return (
    <div className="h-12 flex-none">
      <div className="w-full h-full flex justify-center bg-blue-200 border-b border-black" >
        <div className="hidden md:flex-1 bg-blue-500">
          {/* this part only available on md */}
        </div>
        <Tabs tabs={tabs} handler={handler} />
        <div className="hidden md:flex-1 bg-blue-500">
          {/* this part only available on md */}
        </div>
      </div>
    </div>
  )
}
