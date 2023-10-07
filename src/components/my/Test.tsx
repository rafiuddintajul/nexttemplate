'use client'

export const Test = () => {
  const getWriteoff = async () => {
    const writeoff = await fetch('http://localhost:3000/api/writeoff')
    console.log(writeoff)
  }
  return (
    <div className="h-screen grid grid-cols-1 content-center">
      <div className="h-full flex-col justify-center ">
      <button className="button" onClick={getWriteoff}>Writeoff</button>
      </div>
      
    </div>
  )
}
