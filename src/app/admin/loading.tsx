import { Loader2 } from "lucide-react"
export default function Loading() {
  return <div className="w-full h-screen flex justify-center">
  <div className="h-full flex flex-col justify-center">
    <div className="flex flex-wrap p-5">
      <h2>Retrieving </h2>
      <div className="relative h-10 w-10">
        <Loader2 className="animate-spin text-blue-700 h-full w-full mr-3"/>
        <div className="absolute flex flex-col justify-center w-full h-full top-0">
          <h2 className="w-full text-center">&</h2>
        </div>
      </div>
      <h2>
        Preparing settings&apos; data...
      </h2>
    </div>
  </div>
</div>
}