import React from 'react'

export const ProdCataloguesSkeleton = () => {
  return (
    <div className="h-full py-7 max-w-sm flex flex-col justify-center mx-auto animate-pulse">
      <div className="h-full flex flex-col border rounded-xl shadow-md mx-1 py-4">
        <div className="flex-initial h-[420px]">
          <div className="h-full relative px-6 py-2 overflow-hidden">
            <div className="h-full w-full bg-gray-300"></div>
          </div>
        </div>
        <div className="flex-1 items-center">
          <div className="h-full grid grid-cols-1 content-center">
            <div className="pt-2 flex justify-center">
              <div className="w-1/3 h-7 bg-gray-300 rounded-sm"></div>
            </div>
            <div className="pt-2 flex justify-center">
              <div className="w-24 h-5 bg-gray-300 rounded-sm"></div>
            </div>
            <div className="pt-2 px-2 flex flex-col gap-1">
              <div className="w-full h-5 bg-gray-300 rounded-sm"></div>
              <div className="w-24 h-5 bg-gray-300 rounded-sm self-center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
