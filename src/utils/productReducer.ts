import { Product } from "@/types"

enum Action {
  NAME='name',
  ADDIMGS='addimgs',
  REMIMGS='remimgs',
  PRICE='price',
  TYPE='type',
  ADDTAGS='addtags',
  REMTAGS='remtags',
  DESC='desc',
  AVAILABLE='available',
  CLEAR='clear',
}

type NameAct = {
  type: Action.NAME,
  payload: { name: string }
}
type ImagesAct = {
  type: Action.ADDIMGS | Action.REMIMGS,
  payload: { image: string }
}
type PriceAct = {
  type: Action.PRICE,
  payload: { price: number }
}
type TypeAct = {
  type: Action.TYPE,
  payload: { type: string }
}
type TagsAct = {
  type: Action.ADDTAGS|Action.REMTAGS,
  payload: { tag: string }
}
type DescAct = {
  type: Action.DESC,
  payload: { desc: string }
}
type AvailableAct = {
  type: Action.AVAILABLE,
  payload: { availability: boolean }
}
type ClearAct = {
  type: Action.CLEAR,
  payload?: any
}

type EditProductsAction = NameAct | ImagesAct | PriceAct | TypeAct | TagsAct | DescAct | AvailableAct | ClearAct

const emptyProd = { name:'', images:[], price:0, desc: '', type:'', tags:[], availability:false }

function ProductReducer(state: Product, action: EditProductsAction):Product {
  const { type, payload } = action
  
  switch (type) {
    case 'name':
      return { ...state, name: payload.name }
    case 'addimgs':
      return { ...state, images: [...state.images, payload.image] }
    case 'remimgs':
      const images = state.images.filter(image => image !== payload.image)
      return { ...state, images }
    case 'price':
      return { ...state, price: payload.price  }
    case 'type':
      return { ...state, type: payload.type }
    case 'addtags':
      return { ...state, tags: [...state.tags, payload.tag ] }
    case 'remtags':
      const filteredTags = state.tags.filter(tag => tag !== payload.tag)
      return { ...state, tags: filteredTags }
    case 'desc':
      return { ...state, desc: payload.desc }
    case 'available':
      return { ...state, availability: payload.availability }
    case 'clear':
      return emptyProd
    default:
      return state
  }
}


export { ProductReducer, Action, emptyProd }