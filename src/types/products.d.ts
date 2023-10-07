import { OrderStatus } from "@/models/modelvar"
import { SessionUser } from "./auth"

export type ProductConfiguration = {
  name: string,
  data: {
    tags: string[]
  }
}

export type ItemGroup = {
  _id?:string,
  product:Product,
  quantity:number
}

export type Product = {
  _id?:string,
  name: string,
  images: string[],
  price: number,
  desc: string,
  type: string,
  tags: string[],
  availability: boolean
}

export type Invoice = {
  _id?: string,
  no: string,
  items: ItemGroup[],
  date: Date,
  total: number,
  desc?: string
}

export type Stock = {
product: string,
quantity: number,
reference: string,
status: string,
desc?: string,
}

export type Order = {
  _id?: string,
  name: string, 
  address: string, 
  items: ItemGroup[],
  account?: SessionUser, //this is session user model in case logged in
  date: Date,
  total: number, 
  desc: string,
  status: string,
}

export type WriteOff = {
  _id?: string,
  items: ItemGroup[],
  date: Date,
  reason: string,
  total: number,
}

type DateOptional = { date: Date | undefined }

export type InvoiceFormFields = Omit<Invoice, 'date'> & DateOptional
export type OrderFormFields = Omit<Order, 'date'> & DateOptional
export type WriteOffFormFields = Omit<WriteOff, 'date'> & DateOptional