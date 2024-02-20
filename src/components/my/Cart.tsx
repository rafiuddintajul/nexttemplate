import { ShoppingCart } from 'lucide-react';
import { Ping } from './Ping';

export const Cart = ({ inCart=false, className }:{ inCart?:boolean, className?:string }) => {
  return (
    <div className="relative hover:cursor-pointer h-full w-full">
      {
        inCart && <Ping className="absolute -top-1 -right-1" />
      }
      <ShoppingCart className={`${className} h-full w-full`} />
    </div>
  )
}
