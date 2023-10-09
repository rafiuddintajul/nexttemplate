'use client'

import { AdminNav } from '@/sections'
import { usePathname } from 'next/navigation'


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname()
  const activePath = path.split('/')[2] ?? 'main'
  return (
    <main className="flex flex-1 relative h-full">
      <AdminNav currentPath={activePath}/>
      <section className="sm:container flex flex-1 flex-col overflow-auto">
        {children}
      </section>
    </main>
  )
}
