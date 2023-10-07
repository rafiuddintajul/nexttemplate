import { Product, WriteOffFormFields } from "@/types"

enum Action {
  DATE='date',
  REASON='reason',
  ADDITEM='addItem',
  REMOVEITEM='removeItem',
  CHANGEITEM='changeItem',
  CLEAR='clear',
}
type DateAct = {
  type: Action.DATE,
  payload: { date: Date }
}
type ReasonAct = {
  type: Action.REASON,
  payload: { reason: string }
}
type ItemAct = {
  type: (Action.ADDITEM | Action.REMOVEITEM ),
  payload: { item: { product:Product } }
}
type QuantityAct = {
  type: Action.CHANGEITEM,
  payload: { item: { product:Product, quantity:number } }
}
type ClearAct = {
  type: Action.CLEAR,
  payload: undefined
}

type EditWriteOffAction = DateAct | ReasonAct | ItemAct | QuantityAct | ClearAct

function writeOffReducer(state: WriteOffFormFields, action: EditWriteOffAction):WriteOffFormFields {
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
    case 'date':
      return { ...state, date: payload.date! }
    case 'reason':
      return { ...state, reason: payload.reason }
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
    case 'clear':
      return { items: [], date: undefined, reason: '', total:0 } 
    default:
      return state
  }
}

export { writeOffReducer, Action }