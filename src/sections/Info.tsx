import Image from "next/image"

export const Info = () => {
  return (
    <section className="flex-col h-screen py-2 my-5">
      <div className="flex flex-col px-5 justify-center w-full h-full md:flex-row md:flex-wrap md:mx-auto max-w-4xl">
        <div className="relative flex items-center info_div md:rounded-tl-lg"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <blockquote className="absolute text-slate-100 font-semibold text-xl top-1/2 px-5">
            <p className="pl-5">Duis vitae maximus.</p>
          </blockquote>
          <p className="absolute bottom-0 p-2 opacity-25 text-white text-xs">Photo by Igor Haritanovich: https://www.pexels.com/photo/coffee-beans-1695052/</p>
        </div>
        <div className="p-5 info_div md:rounded-tr-lg">
          <div className="flex items-center h-full">
            <div className="flex-col">
              <p className="pb-1 text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor omnis nihil culpa quo reprehenderit similique.</p>
              <p className="pb-1 text-center">Aenean lobortis non dolor at mattis. Donec interdum sed velit ut consequat.</p>
              <p className="text-2xl font-semibold text-center tracking-widest">. . .</p>
            </div>
          </div>
        </div>
        <div className="relative info_div md:rounded-br-lg md:order-4"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1907071/pexels-photo-1907071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            backgroundSize: "cover",
            backgroundPosition: "center center"
          }}
        >
          <blockquote className="absolute text-slate-100 font-semibold text-xl top-1/2 px-5">
            <p className="pl-4">Nullam vulputate nibh.</p>
          </blockquote>
          <p className="absolute bottom-0 p-2 opacity-25 text-white text-xs">Photo by Elina Sazonova: https://www.pexels.com/photo/two-brown-ceramic-mugs-1907071/</p>
        </div>
        <div className="p-5 rounded-b-lg info_div md:rounded-bl-lg md:order-3">
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

