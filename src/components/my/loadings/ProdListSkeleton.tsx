import React from 'react'

export const ProdListSkeleton = () => {
  return (
    <div className="w-full flex-col px-2">
      {
        ['',''].map((v,i) => {
          return <div key={i} className="group/product w-full border rounded-lg p-2 mb-2 bg-gray-100 h-[12rem] flex gap-2 active:ring active:ring-blue-300 animate-pulse">
          <div className="w-2/5 flex-none h-full bg-gray-200 rounded-md">
          </div>
          <div className="flex-1">
            <div className="flex-col">
              <div className="mb-2 bg-gray-200 h-[32px] w-24 rounded-md"></div>
              <div className="mb-1 bg-gray-200 h-[20px] w-28 rounded-md"></div>
              <div className="mb-1 h-[26px] text-xs flex gap-1">
                <div className="group/tag border border-gray-400 w-16 rounded-sm p-1 opacity-60">
                </div>
                <div className="group/tag border border-gray-400 w-16 rounded-sm p-1 opacity-60">
                </div>
              </div>
              <div className="bg-gray-200 h-[20px] w-full mb-1 rounded-sm"></div>
              <div className="bg-gray-200 h-[20px] w-48 mb-1 rounded-sm"></div>
            </div>
          </div>
        </div>
        })
      }
    </div>
  )
}