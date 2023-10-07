'use client'

import type { Metadata } from 'next'
import { AdminNav } from '@/sections'
import { usePathname } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Company | Admin',
  description: 'Admin Page',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname()
  const activePath = path.split('/')[2] ?? 'main'
  return (
    <main className="flex flex-1 overflow-y-auto relative">
      <AdminNav currentPath={activePath}/>
      {children}
    </main>
  )
}
