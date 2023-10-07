'use client'

import { HTMLAttributes, useRef } from "react"

type HoverViewProps = {
  children: React.ReactNode,
} & HTMLAttributes<HTMLDivElement>

export const HoverView = ({ children, ...props }:HoverViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const test = () => {
    console.log(containerRef.current)
  }
  return (
    <div ref={containerRef} {...props} >
      <div onFocus={test}>
        {children}
      </div>
    </div>
  )
}