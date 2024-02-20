import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <div className="w-full relative py-2 bg-gray-100">
      <section className="flex flex-col gap-3">
        <div className="flex flex-col flex-center gap-2 mb-3">
          <h3 className="company_title text-emerald-900 text-center">Company&nbsp;&nbsp;</h3>
          <div className="grid grid-cols-1">
            <a className="text-center font-semibold" href="">About Us</a>
            <a className="text-center font-semibold" href="">Career</a>
            <a className="text-center font-semibold" href="">FAQ</a>
            <a className="text-center font-semibold" href="">Rewards</a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="mx-auto font-bold tracking-tighter text-sm">Follow us on:</p>
          <div className="flex gap-2 mx-auto">
            <div title="Facebook"><Facebook /></div>
            <div title="Instagram"><Instagram /></div>
            <div title="Twitter"><Twitter /></div>
            <div title="YouTube"><Youtube /></div>
          </div>
        </div>
        <div className="flex flex-col p-2 max-w-sm bg-white gap-2 mx-auto">
          <p className="text-sm text-center">Company {'('}M{')'} Sdn Bhd</p>
          <div>
            <p className="text-sm text-center px-5 break-normal">Company registration no: 0000-0000-000 {'('}1111111-S{')'}</p>
          </div>
          <p className="text-sm text-center">COPYRIGHT 2023 &copy; COMPANY</p>
          <a className="text-sm text-center" href="">Terms & Conditions</a>
        </div>
      </section>
    </div>
  )
}
