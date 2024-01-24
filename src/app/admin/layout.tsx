'use client'

import { AdminNav } from '@/sections'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import Loading from './loading'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname()
  const activePath = path.split('/')[2] ?? 'main'
  return (
    <main className="flex flex-1 relative h-full border-2 overflow-hidden">
      <AdminNav currentPath={activePath}/>
      {/* section style must be the same with page-section style */}
      <section className="flex flex-col overflow-auto">
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </section> 
    </main>
  )
}
