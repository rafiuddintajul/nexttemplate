
export const AdminHeader = ({ name }:{ name: string|null|undefined}) => {
  
  return (
    <section className="py-4 mt-0">
      <h1 className="font-bold text-center py-3">Welcome admin <span className="text-sky-700 underline decoration-indigo-500 decoration-4">{name}</span></h1>
      <div>
        <p className="text-center px-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores recusandae perferendis odit magnam vitae iusto, porro molestiae iure error culpa esse id molestias!</p>
      </div>
    </section>
  )
}