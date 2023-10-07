import { Product, InvoiceFormFields } from "@/types"

enum Action {
  INVOICENO='invoiceNo',
  DATE='date',
  DESC='desc',
  ADDITEM='addItem',
  REMOVEITEM='removeItem',
  CHANGEITEM='changeItem',
  CLEAR='clear',
}
type InvoiceAct = {
  type: Action.INVOICENO,
  payload: { no: string }
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
type ClearAct = {
  type: Action.CLEAR,
  payload: undefined
}

type EditInvoiceAction = InvoiceAct | DateAct | DescAct | ItemAct | QuantityAct | ClearAct

function invoiceReducer(state: InvoiceFormFields, action: EditInvoiceAction):InvoiceFormFields {
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
    case 'invoiceNo':
      return { ...state, no: payload.no! }
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
    case 'clear':
      return { no: '', items: [], date: undefined, desc: '', total: 0 }
    default:
      return state
  }
}

export { invoiceReducer, Action }