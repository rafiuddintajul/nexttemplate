import { Loader2 } from "lucide-react"

async function getConfigs(){
  const res = await fetch(`${process.env.DEV_URL}/api/configs/AdminMainConfig`,
    {
      cache: "no-cache"
    })
  if (res.status === 200 && res.statusText === 'none-existence') {
    return undefined
  }
  return res.json()
}

export default async function AdminPage (){
  const configs = await getConfigs()
  
  return (
    <div className="pt-5 pb-2 flex w-full pl-3 gap-2 justify-center relative">
      <div className="flex flex-col">
        <div className="flex gap-2 justify-center">
          <h1 className="px-2">Main Settings</h1>
        </div>
        <h4 className="text-center">Welcome &apos;Somebody&apos; </h4>
      </div>
    </div>
  )
}