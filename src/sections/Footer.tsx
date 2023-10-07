import Image from "next/image"

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
            <Image src="/assets/logo/facebook.png" width={35} height={35} alt="facebook_logo" />
            <Image src="/assets/logo/instagram.png" width={35} height={35} alt="instagram_logo" />
            <Image src="/assets/logo/twitter.png" width={35} height={35} alt="twitter_logo" />
            <Image src="/assets/logo/youtube.png" width={35} height={35} alt="youtube_logo" />
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
      <a className="text-xs" href="https://www.flaticon.com/free-icons/facebook" title="facebook icons">Facebook, Instagram, Twitter and Youtube icons created by riajulislam - Flaticon</a>
    </div>
  )
}
