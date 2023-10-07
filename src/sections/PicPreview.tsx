'use client'

import { Carousel } from 'react-responsive-carousel'

export const PicPreview = () => {
  const prevArrow = (clickHandler: () => void, prevItem: boolean, lable: any) => {
    const availablityClass = !prevItem ? "control-disabled" : '';
    return (<button type="button" aria-label="previous slide / item" className={`control-arrow control-prev ${availablityClass}`} onClick={clickHandler}>
      <img src="/assets/logo/left-arrow2.svg" style={{ width: "1.25rem" }} />
    </button>)
  }

  const nextArrow = (clickHandler: () => void, nextItem: boolean, lable: any) => {
    const availablityClass = !nextItem ? "control-disabled" : '';
    return (
      <button type="button" aria-label="next slide / item" className={`control-arrow control-next ${availablityClass}`} onClick={clickHandler}>
        <img src="/assets/logo/right-arrow2.svg" style={{ width: "1.25rem" }} />
      </button>
    )
  }

  const caraouselPics = [
    {
      url: 'https://cdn.pixabay.com/photo/2017/06/20/22/14/man-2425121_1280.jpg',
      credit: 'Image by 5688709 from Pixabay',
      position: '',
      addStyle: '',
      content: (<div className="h-full grid grid-cols-1 content-center gap-2">
        <h2 className="px-3 text-white md:text-5xl">Fusce interdum pulvinar justo.</h2>
        <p className="px-3 text-white md:text-xl">In porttitor, felis ut tempor bibendum, libero erat luctus purus, nec sagittis.</p>
      </div>)
    },
    {
      url: 'https://cdn.pixabay.com/photo/2015/06/24/01/15/coffee-819362_1280.jpg',
      credit: 'Image by fancycrave1 from Pixabay',
      position: '65%',
      addStyle: '',
      content: (<div className="h-full grid grid-cols-1 content-around">
        <div>
          <h1 className="px-3 text-white md:text-5xl">Phasellus elit neque.</h1>
          <p className="px-3 text-xs text-white ">Curabitur et tellus libero. Aliquam faucibus consectetur massa.</p>
        </div>
        <p className="px-3 text-white md:text-xl">Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum maximus.</p>
      </div>)
    },
    {
      url: 'https://cdn.pixabay.com/photo/2019/07/13/11/44/coffee-4334647_1280.jpg',
      credit: 'Image by Soner Köse from Pixabay',
      position: '40%',
      addStyle: 'opacity-90',
      content: (<div className="h-full grid grid-cols-1">
        <div></div>
        <div className="h-full relative flex justify-center">
          <div className="absolute max-w-lg" style={{ top: "50%" }}>
            <h3 className="pb-3 text_outline md:text-3xl font-bold underline underline-offset-8">Donec Quis Sapien</h3>
            <p className="text-black md:text-xl font-bold text-xl text_outline leading-7">Pellentesque pharetra viverra justo. Maecenas at auctor odio. Sed non ullamcorper libero. Nulla pretium.</p>
          </div>
        </div>
      </div>)
    }
  ]

  return (
    <section className="h-screen py-2">
      <Carousel showThumbs={false} showStatus={false} className="flex-1 w-full h-full" renderArrowNext={nextArrow} renderArrowPrev={prevArrow} autoPlay={false} infiniteLoop={true} interval={3000} emulateTouch={true}>
        {caraouselPics.map(i => (
          <div key={i.credit} className={"w-full h-full relative md:bg-cover bg-auto " + i.addStyle} style={{
            backgroundImage: `url(${i.url})`,
            backgroundPosition: i.position
          }}>
            {i.content && i.content}
            <p className="absolute bottom-0 p-2 opacity-20 text-white">{i.credit}</p>
          </div>
        ))}
      </Carousel>
    </section>
  )
}