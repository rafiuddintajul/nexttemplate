import { getServerSession } from 'next-auth/next'
import { Welcome, Info, Catalogue, Footer } from '@/sections'

export default async function Home() {
  const session = await getServerSession()
  return (
    <main className="w-full flex-center flex-col">
      <Welcome />
      <Info />
      <Catalogue />
      <Footer />
    </main>
  )
}
