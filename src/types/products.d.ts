import { OrderStatus } from "@/models/modelvar"
import { SessionUser } from "./auth"

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
  tags: string[],
  stock?:number,
  availability: boolean,
  description: string
}

export type Order = {
  _id?: string,
  name: string, 
  address: string, 
  items: ItemGroup[],
  account?: SessionUser, //this is session user model in case logged in
  date: Date,
  total: number, 
  status: string,
  description: string,
}

type DateOptional = { date: Date | undefined }
export type OrderFormFields = Omit<Order, 'date'> & DateOptional
