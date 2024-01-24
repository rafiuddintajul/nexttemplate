/**  
 * The amount of group could be varied
 * If type ever being used, at least must have groupA
 * The only way to change the group amount is by hardcode the type here
 */

export type TextContent = {
  type: 'article',
  article?:string,
  style?:string,
}

export type PicContent = {
  type: 'picture',
  url?: string,
  style?:string,
}

export type CustomizableContent = {
  _id?:string,
  contents: (TextContent | PicContent)[] | []
  structure?:string,
  bgPic?:{
    url?:string,
    style?:string
  }
}

export type SectionContents = {
  _id?:string,
  contents: CustomizableContent[]
}




