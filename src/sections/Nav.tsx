import Image from "next/image"
import Link from "next/link"

export const Nav = () => {
  return (
    <nav className="h-12 flex-none bg-pink-300">
      {/* <div className="flex flex-center gap-2">
        <Image src="/assets/logo/custom_company.svg" width={35} height={35} alt="company_name" />
        <div className="hidden md:flex items-center ">
          <h3 className="company_title text-emerald-900">Company&nbsp;&nbsp;</h3>
        </div>
        <Link href='/api/auth/signin?callbackUrl=/'>SignIn</Link>
      </div> */}
    </nav>
  )
}
