'use client'

import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ComponentProps, } from "react";

export const SlidingSection = ({children, ...props}:{children?:React.ReactNode} & ComponentProps<"div">) => {
  const prevArrow = (clickHandler: () => void, prevItem: boolean, lable: any) => {
    const availablityClass = !prevItem ? "control-disabled" : '';
    return (<button type="button" aria-label="previous slide / item" className={`control-arrow control-prev ${availablityClass}`} onClick={clickHandler}>
      prev
    </button>)
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    className:'w-full relative',
    adaptiveHeight:true
  };

  return (
    <div {...props}>
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  )
}