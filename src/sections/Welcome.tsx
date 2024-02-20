import Image from "next/image"
import { SlidingSection } from "./SlidingSection"
import { TextEditor } from "@/components/my"

async function getContents(){
  const data = await fetch(`${process.env.URL}/api/contents`)
  const contents = await data.json()
  return contents
}

export const Welcome = async () => {
  const contents = await getContents()
  
  return (
    <section>
      {
        (await contents).map((section:any) => {
          return <SlidingSection key={section._id}>
            {section.contents.map((slide:any)=>{
              return <div key={slide._id} className="flex flex-col justify-center h-[860px] gap-1 relative md:flex-row bg-gray-300">
                <Image 
                  src={slide.bgPic?.url}
                  alt="mountain"
                  fill
                  className="object-cover object-center w-full h-full z-0"
                />
                <div className="flex flex-col justify-center py-5 px-1 h-full w-full md:container md:flex-row">
                  {
                    slide.contents.map((content:any, i:number) => {
                      if (content.type === 'article') {
                        if (content.article) {
                          return (
                            <div key={i} className="relative flex self-center w-full z-10 max-h-[360px] max-w-xl px-3 group/text">
                              <div className="w-full flex flex-col h-[360px] justify-center">
                                <TextEditor namespace={`article_${i}`} state={content.article} editable={false} />
                              </div>
                            </div>
                          )
                        }
                      } else {
                        if (content.url) {
                          return (
                            <div key={i} className="self-center relative w-[300px] h-[250px] max-w-xl md:w-full md:h-[360px]">
                              <Image
                                src={content.url} 
                                alt="hiker"
                                fill
                                className="object-cover"
                              />
                            </div>)
                        }
                      }
                    })
                  }
                </div>
              </div>
            })}
          </SlidingSection>
        })
      }
      
    </section>
  )
}
