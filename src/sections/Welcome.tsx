export const Welcome = () => {
  return (
    <section className="h-screen" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      opacity: 0.9,
    }}>
      <div className="flex items-center h-screen">
        <div className="flex-col px-2">
          <h1 className="text-slate-100 mb-4 font-bold text_shadow text-left fade_in">Lorem ipsum dolor sit amet.</h1>
          <p className=" text-slate-100 text_shadow text-right fade_in">Nullam consectetur nibh sed efficitur auctor. Proin maximus id diam vitae ultrices. Nulla id nisi scelerisque, tempus eros eget, rhoncus.</p>
        </div>
      </div>
      <p className="absolute bottom-0 p-3 text-white text-xs opacity-10">Photo by <a href="https://unsplash.com/@nate_dumlao?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nathan Dumlao</a> on <a href="https://unsplash.com/photos/6VhPY27jdps?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
   </p>
    </section>
  )
}
