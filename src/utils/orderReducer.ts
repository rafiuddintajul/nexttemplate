import { Product, SessionUser, OrderFormFields } from "@/types"

enum Action {
  NAME='name',
  ADDRESS='address',
  ACC='account',
  DATE='date',
  DESC='desc',
  ADDITEM='addItem',
  REMOVEITEM='removeItem',
  CHANGEITEM='changeItem',
  STATUS='status',
  CLEAR='clear',
}
type NameAct = {
  type: Action.NAME,
  payload: { name: string }
}
type AddressAct = {
  type: Action.ADDRESS,
  payload: { address: string }
}
type AccAct = {
  type: Action.ACC,
  payload: { account: SessionUser | undefined }
}
type DateAct = {
  type: Action.DATE,
  payload: { date: Date }
}
type DescAct = {
  type: Action.DESC,
  payload: { desc: string }
}
type ItemAct = {
  type: (Action.ADDITEM | Action.REMOVEITEM ),
  payload: { item: { product:Product } }
}
type QuantityAct = {
  type: Action.CHANGEITEM,
  payload: { item: { product:Product, quantity:number } }
}
type StatusAct = {
  type: Action.STATUS,
  payload: { status: string }
}
type ClearAct = {
  type: Action.CLEAR,
  payload: undefined
}

type EditOrderAction = NameAct | AddressAct | AccAct | DateAct | DescAct | ItemAct | QuantityAct | StatusAct | ClearAct

function orderReducer(state: OrderFormFields, action: EditOrderAction):OrderFormFields {
  const { type, payload } = action
  const countTotal = (items:{ product:Product, quantity:number }[]):number => {
    if (items.length !== 0) {
      return items.reduce((total: number, item:{ product:Product, quantity:number }): number => {
        const prodTotal = item.quantity * item.product.price
        return Number(total + prodTotal)
      }, 0)
    }
    return 0
  }
  switch (type) {
    case 'name':
      return { ...state, name: payload.name }
    case 'address':
      return { ...state, address: payload.address }
    case 'account':
      return { ...state, account: payload.account }
    case 'date':
      return { ...state, date: payload.date! }
    case 'desc':
      return { ...state, desc: payload.desc }
    case 'addItem':
      return { ...state, items:[...state.items, { product:payload.item!.product, quantity:0 }]  }
    case 'removeItem':
      const subtractedList = state.items.filter(item => item.product._id !== payload!.item?.product._id)
      return { ...state, items: subtractedList, total:countTotal(subtractedList) }
    case 'changeItem':
      const quantityChangedList = state.items.map(item => {
        if (item.product._id === payload.item?.product._id) return { ...item, quantity: payload.item.quantity }
        return item
      })
      return { ...state, items: quantityChangedList, total:countTotal(quantityChangedList) }
    case 'status':
      return { ...state, status: payload.status }
    case 'clear':
      return { name: '', address: '', status:'new', account:undefined, items: [], date: undefined, desc: '', total: 0 }
    default:
      return state
  }
}

export { orderReducer, Action }