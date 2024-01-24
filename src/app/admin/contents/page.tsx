
import { ContentsForm } from "@/sections/admin"

export default async function AdminPage (){
  
  return <>
    <div className="pt-5 pb-2 flex w-full pl-3 gap-2 justify-center">
        <div className="flex flex-col">
          <h1 className="text-center">Contents</h1>
          <p className="text-sm mt-5">Add/edit customizable content section for main page. Each sections may appear as slide if add more main contents into it.</p>
        </div>
    </div>
    <ContentsForm  />
  </>
}