'use client'

import { SessionUser } from '@/types/auth'

import { SessionProvider } from 'next-auth/react'

export const Provider = ({ children, session }: { children: React.ReactNode, session?: SessionUser }) => {
  return (
    <SessionProvider session={session}>
      { children }
    </SessionProvider>
  )
}