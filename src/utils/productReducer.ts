import { Product } from "@/types"

enum Action {
  NAME='name',
  ADDIMGS='addimgs',
  REMIMGS='remimgs',
  PRICE='price',
  ADDTAGS='addtags',
  REMTAGS='remtags',
  STOCK='stock',
  AVAILABLE='available',
  DESC='desc',
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
  payload: { price: string }
}
type TagsAct = {
  type: Action.ADDTAGS|Action.REMTAGS,
  payload: { tag: string }
}
type StockAct = {
  type: Action.STOCK,
  payload: { stock: number }
}
type DescAct = {
  type: Action.DESC,
  payload: { description: string }
}
type AvailableAct = {
  type: Action.AVAILABLE,
  payload: { availability: boolean }
}
type ClearAct = {
  type: Action.CLEAR,
  payload?: any
}

type EditProductsAction = NameAct | ImagesAct | PriceAct | TagsAct | StockAct | AvailableAct | DescAct | ClearAct

 type ProdReducer = Omit<Product, 'price'> & { price: string }

const emptyProd = { name:'', images:[], price:'0', tags:[], stock:0, availability:false, description: '', }

function ProductReducer(state: ProdReducer, action: EditProductsAction):ProdReducer {
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
      return { ...state, price:payload.price }
    case 'addtags':
      return { ...state, tags: [...state.tags, payload.tag ] }
    case 'remtags':
      const filteredTags = state.tags.filter(tag => tag !== payload.tag)
      return { ...state, tags: filteredTags }
    case 'stock':
      return { ...state, stock: payload.stock }
    case 'available':
      return { ...state, availability: payload.availability }
    case 'desc':
      return { ...state, description: payload.description }
    case 'clear':
      return emptyProd
    default:
      return state
  }
}


export { ProductReducer, Action, emptyProd, type ProdReducer }