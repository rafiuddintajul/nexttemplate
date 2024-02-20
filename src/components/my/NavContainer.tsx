'use client'
import { useEffect, useState, createContext, useContext } from "react"
import Link from "next/link";
import { Bird, LogIn } from 'lucide-react';
import { Cart } from "./Cart";
import { MenuDropdown } from "./MenuDropdown";
import { Button } from "../ui";
import { Ping } from "./Ping";

export const NavContext = createContext(null as any)

export const NavContainer = ({ children }:{ children?: React.ReactNode }) => {
  const [ scrolled, setScrolled ] = useState(false)
  const [ utility, setUtility ] = useState(true)
  const [ cart, setCart ] = useState(false)
  let utilityTimeout:ReturnType<typeof setTimeout>;

  const handleScroll = (e:React.UIEvent<HTMLDivElement>) => {
    const distance = e.currentTarget.scrollTop
    if (scrolled === false) {
      if (distance > 360) {
        setScrolled(true)
        utilityTimeout = setTimeout(()=>setUtility(false), 1000)
      }
    } else {
      if (distance < 10) {
        setScrolled(false)
        utilityTimeout = setTimeout(()=>setUtility(true), 1000)
      }
    }
  }

  useEffect(()=>{
    const inCart = localStorage.getItem('cart')
    if (inCart) {
      setCart(true)
    }

    return ()=>{
      if (utilityTimeout !== undefined) {
        clearTimeout(utilityTimeout)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const navClass = scrolled ? "h-12 w-12 delay-500 rounded-full mt-1 ml-1 shadow-md" : "h-full w-full";
  const fadeOut = scrolled ? "opacity-0" : "opacity-100 delay-1000";
  const hide = scrolled ? "w-0": "w-[108px] delay-500";
  const container = scrolled ? "w-full h-full" : "gap-2";
  const ping = utility ? "opacity-0" : "opacity-1"

  return (
    <div className="max-h-full w-full flex flex-col overflow-scroll scrollbar-hide relative" onScroll={handleScroll}>
      <nav className="fixed top-0 z-30 h-16 w-full">
        <div className={"relative transition-all ease-in-out flex justify-center bg-emerald-300 "+navClass}>
          { (scrolled && cart) && <Ping className={"absolute top-0 right-0 z-20 "+ping} />  }
          <div className={"flex justify-center "+container} >
            { 
              scrolled
              ? <MenuDropdown inCart={cart}>
                  <Button type="button" className="p-0 b-0 hover:bg-secondary group w-full rounded-full">
                    <Bird className="text-emerald-900 my-auto group-hover:text-secondary-foreground"/>
                  </Button>
                </MenuDropdown>
              : <Bird className="text-emerald-900 my-auto"/> 
            }
            <div className={"transition-all ease-in-out my-auto "+hide}>
              <h3 className={"transition-all ease-in text-emerald-900 "+fadeOut}>Company</h3>
            </div>
          </div>
          {
            utility
            && <div className="transition-all ease-in-out absolute flex flex-col justify-center right-3 h-full w-24">
              <div className={"transition-all ease-in-out flex justify-end gap-2 "+fadeOut}>
                <div className="w-5 h-5 my-auto sm:w-6 sm:h-6"><Cart inCart={cart} className="text-primary-foreground" /></div>
                <Link href='/api/auth/signin?callbackUrl=/' className="text-primary-foreground hidden sm:flex">Sign In</Link>
                <div className="w-5 h-5 my-auto sm:hidden"><Link href='/api/auth/signin?callbackUrl=/' className="text-primary-foreground"><LogIn className="h-full w-full" /></Link></div>
              </div>
            </div>
          }
        </div>
      </nav>
      <NavContext.Provider value={{ cart, setCart }}>
        {children}
      </NavContext.Provider>
    </div>
  )
}

