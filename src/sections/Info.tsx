import Image from "next/image"

export const Info = () => {
  return (
    <section className="flex-col h-screen py-2 bg-gray-100">
      <div className="flex flex-col px-5 justify-center w-full h-full md:flex-row md:flex-wrap md:mx-auto max-w-4xl">
        <div className="relative flex items-center border-4 border-b-0 border-emerald-600 rounded-t-lg info_div md:rounded-tl-lg"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <blockquote className="absolute text-slate-100 font-semibold text-xl top-1/2 px-5">
            <Image src="/assets/logo/quote.png" width={40} height={40} alt="quote" />
            <p className="pl-5">Duis vitae maximus.</p>
          </blockquote>
          <p className="absolute bottom-0 p-2 opacity-25 text-white text-xs">Photo by Igor Haritanovich: https://www.pexels.com/photo/coffee-beans-1695052/</p>
        </div>
        <div className="p-5 border-x-4 border-emerald-600 info_div md:rounded-tr-lg">
          <div className="flex items-center h-full">
            <div className="flex-col">
              <p className="pb-1 text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor omnis nihil culpa quo reprehenderit similique.</p>
              <p className="pb-1 text-center">Aenean lobortis non dolor at mattis. Donec interdum sed velit ut consequat.</p>
              <p className="text-2xl font-semibold text-center tracking-widest">. . .</p>
            </div>
          </div>
        </div>
        <div className="relative border-x-4 border-emerald-600 info_div md:rounded-br-lg md:order-4"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1907071/pexels-photo-1907071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            backgroundSize: "cover",
            backgroundPosition: "center center"
          }}
        >
          <blockquote className="absolute text-slate-100 font-semibold text-xl top-1/2 px-5">
            <Image src="/assets/logo/quote.png" width={40} height={40} alt="quote" />
            <p className="pl-4">Nullam vulputate nibh.</p>
          </blockquote>
          <p className="absolute bottom-0 p-2 opacity-25 text-white text-xs">Photo by Elina Sazonova: https://www.pexels.com/photo/two-brown-ceramic-mugs-1907071/</p>
        </div>
        <div className="p-5 border-4 border-t-0 border-emerald-600 rounded-b-lg info_div md:rounded-bl-lg md:order-3">
          <div className="flex items-center h-full">
            <div className="flex-col">
              <p className="pb-1 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia dolor nisi voluptatem eveniet aperiam iste aliquam amet facere magnam!</p>
              <p className="text-2xl font-semibold text-center tracking-widest">. . .</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

