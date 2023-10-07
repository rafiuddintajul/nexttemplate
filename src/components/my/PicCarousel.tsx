'use client'

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"

type PicCarouselProps = {
  urls: string[]
}

export const PicCarousel = ({ urls }:PicCarouselProps) => {
  const [view, setView] = useState(0)
  const [reveal, setReveal] = useState(false)
  const display = reveal ? 'hidden' : 'block'

  const leftHandler = () => {
    if (view > 0) {
      setView(index => index-1)
    }
  }

  const rightHandler = () => {
    if (view < urls.length-1) {
      setView(index => index+1)
    }
  }

  const activeStyle = (index:number) => {
    if (index < view) {
      return "-left-full"
    } else if (index > view) {
      return "left-full"
    }
    return "left-0"
  }

  const arrowDisable = (direction:string) => {
    if ((direction === 'left' && view === 0)||(direction === 'right' && view === urls.length - 1)) return " opacity-20"
    return "opacity-100"
  }

  return (
    <div className="w-full h-full flex rounded-lg overflow-hidden relative ">
      {urls.map((url, index) => {
        return (<div key={url} className={`w-full h-full absolute top-0 ease-in-out duration-300 ${activeStyle(index)}`}>
          <div className="w-full h-full relative">
            <Image src={url} alt={url} className="object-cover" fill onLoadingComplete={()=>setReveal(true)}/>
            <span className={`h-full w-full absolute top-0 left-0 bg-blue-400 z-50 animate-pulse text-center ${display}`}>
                Loading
            </span>
          </div>
        </div>)
      })}
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <ArrowLeft className={`m-2 hover:cursor-pointer text-blue-400 ${arrowDisable('left')}`} size={20} onClick={leftHandler}/><ArrowRight className={`m-2 hover:cursor-pointer text-blue-400 ${arrowDisable('left')}`} size={20} onClick={rightHandler}/>
      </div>
    </div>
  )
}