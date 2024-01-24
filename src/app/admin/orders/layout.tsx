export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <div className="pt-5 pb-2 flex flex-col w-full gap-2 justify-center relative">
      <div className="flex flex-col">
        <div className="flex gap-2 justify-center">
          <h1>Order</h1>
        </div>
      </div>
      { children }
    </div>
  )
}