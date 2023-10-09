'use client'

export default function WriteoffsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex-col max-w-2xl h-full w-full md:mx-auto overflow-y-auto">
      {children}
    </section>
  )
}
