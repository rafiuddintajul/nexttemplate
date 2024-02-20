import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui'
import { NavContainer } from '@/components/my'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Web App',
  description: 'Template for nextapp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`max-h-screen min-h-screen ${inter.className}`}>
        <NavContainer>
          {children}
        </NavContainer>
        <Toaster />
      </body>
    </html>
  )
}
