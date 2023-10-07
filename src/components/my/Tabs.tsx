'use client'

import { useState } from "react"

type TabsProps = {
  tabs: {
    name:string,
    className:string
  }[],
  handler: (tab: string) => void,
} & React.HTMLAttributes<HTMLDivElement>

export const Tabs = ({ tabs, handler, ...props }: TabsProps) => {

    return (
    <div className="flex justify-center w-full pt-3 px-1 md:max-w-[60%] border-black" {...props}>
      {
        tabs.map(tab => <div key={tab.name} className={tab.className} onClick={() => handler(tab.name)}>{tab.name}</div>)
      }
    </div>
  )
}
