import { getServerSession } from 'next-auth/next'
import { Welcome, PicPreview, Info, Catalogue, Footer } from '@/sections'
import "react-responsive-carousel/lib/styles/carousel.min.css"


export default async function Home() {
  const session = await getServerSession()
  return (
    <main className="w-full flex-center flex-col">
      <Welcome />
      <PicPreview />
      <Info />
      <Catalogue />
      <Footer />
    </main>
  )
}
