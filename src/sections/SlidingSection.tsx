'use client'

import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ComponentProps, } from "react";
import { Settings } from "react-slick";

type SlidingSectionProps = {
  children?:React.ReactNode
  settings?: Settings,
} & ComponentProps<"div">

const defaultSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  className:'w-full relative',
  adaptiveHeight:true
};

export const SlidingSection = ({children, settings=defaultSettings, ...props}:SlidingSectionProps) => {
  const prevArrow = (clickHandler: () => void, prevItem: boolean, lable: any) => {
    const availablityClass = !prevItem ? "control-disabled" : '';
    return (<button type="button" aria-label="previous slide / item" className={`control-arrow control-prev ${availablityClass}`} onClick={clickHandler}>
      prev
    </button>)
  }

  return (
    <div {...props}>
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  )
}