'use client'

type ProductCardProps = {
  data: {
    name: string,
    imgAdj?: {},
    src: string,
    desc: string,
    price: string,
    credit: string,
    button: {
      name: string,
      clickHandler: () => void
    }
  }
}

export const ProductCard = ({ data }: ProductCardProps) => {

  return (
    <div className="h-full py-7 max-w-sm flex flex-col justify-center mx-auto">
      <div className="h-full flex flex-col border rounded-xl shadow-md mx-1 py-4">
        <div className="flex-initial " style={{ height: "420px" }}>
          <div className="h-full relative px-6 py-2 overflow-hidden">
            <img src={data.src} style={data.imgAdj ?? {}} className="h-full" />
            <p className="p-2 px-7 w-full absolute bottom-0 left-0 text-start text-xs text-white opacity-20">{data.credit}</p>
          </div>
        </div>
        <div className="flex-1 items-center">
          <div className="h-full grid grid-cols-1 content-center">
            <h3 className="py-2 text-center font-serif font-semibold underline decoration-1 underline-offset-8">{data.name}</h3>
            <p className="text-center px-2 line-clamp-1">{data.desc}</p>
            <p className="text-center">{data.price}</p>
            {data.button && (<div className="content-center md:py-5">
              <button type="button" className="py-1 px-5 rounded-full bg-emerald-500 text-white" onClick={data.button.clickHandler}>{data.button.name}</button>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}