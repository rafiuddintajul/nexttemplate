'use client'

import { ProductCard } from "../components/cards"
import { Carousel } from 'react-responsive-carousel'

export const Catalogue = () => {

  const prevArrow = (clickHandler: () => void, prevItem: boolean, lable: any) => {
    const availablityClass = !prevItem ? "control-disabled" : '';
    return (
      <button type="button" aria-label="previous slide / item" className={`control-arrow control-prev ${availablityClass}`} onClick={clickHandler}>
        <img src="/assets/logo/left-arrow.svg" style={{ width: "1.25rem" }} />
      </button>
    )
  }

  const nextArrow = (clickHandler: () => void, nextItem: boolean, lable: any) => {
    const availablityClass = !nextItem ? "control-disabled" : '';
    return (
      <button type="button" aria-label="next slide / item" className={`control-arrow control-next ${availablityClass}`} onClick={clickHandler}>
        <img src="/assets/logo/right-arrow.svg" style={{ width: "1.25rem" }} />
      </button>
    )
  }

  const carouselData = [
   {
      name: 'Coffee Latte',
      src: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
      desc: 'Aliquam ipsum nisi, tincidunt sed. Integer magna eros, rhoncus vel egestas et, consectetur.',
      price: '$2.50',
      credit: 'Photo by Chevanon Photography: https://www.pexels.com/photo/close-up-of-coffee-cup-on-table-312418/',
      button: {
        name: 'Buy',
        clickHandler: ()=> console.log('Click Button')
      },
    },
    {
      name: 'Coffee Mocha',
      src: 'https://images.pexels.com/photos/2128109/pexels-photo-2128109.jpeg',
      desc: 'Aliquam ipsum nisi, tincidunt sed. Integer magna eros, rhoncus vel egestas et, consectetur.',
      price: '$3.50',
      credit: 'Photo by Gül Işık: https://www.pexels.com/photo/black-teacup-on-saucer-beside-cookie-2128109/',
      button: {
        name: 'Buy',
        clickHandler: ()=> console.log('Click Button')
      },
    },
    {
      name: 'Ice Cream',
      src: 'https://images.pexels.com/photos/2819088/pexels-photo-2819088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      desc: 'Aliquam ipsum nisi, tincidunt sed. Integer magna eros, rhoncus vel egestas et, consectetur.',
      price: '$8.50',
      credit: 'Photo by AVICHAL LODHI: https://www.pexels.com/photo/ice-cream-dish-2819088/',
      button: {
        name: 'Buy',
        clickHandler: ()=> console.log('Click Button')
      },
    },
  ]

  // frappe Photo by freestocks.org: https://www.pexels.com/photo/white-and-brown-caramel-frappe-on-clear-drinking-glass-214333/

  return (
    <div className="w-full h-screen relative py-2">
      <section className="w-full h-full flex flex-col px-2 py-0">
        <div className="h-1/5 flex-none flex items-center mx-auto">
          <div className="flex-col">
            <h2 className="p-2 text-center font-bold  tracking-tight decoration-4 product_title">Nunc quis magna</h2>
            <p className="p-2 mb-2 font-semibold text-center tracking-tight">Cras purus arcu, sollicitudin eu ultricies a, mollis vitae mauris. Maecenas gravida.</p>
            <div className="w-60 h-1 mx-auto bg_theme" />
          </div>
        </div>
        <Carousel showThumbs={false} showStatus={false} className="flex-1" renderArrowPrev={prevArrow} renderArrowNext={nextArrow} emulateTouch={true} autoFocus={false}>
          {carouselData.map(i => (
            <ProductCard key={i.name} data={i} />
          ))}
        </Carousel>
      </section>
    </div>
  )
}
