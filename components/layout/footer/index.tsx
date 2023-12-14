import React from "react"
import { useLanguage } from "hooks/useLanguage"
import FooterColumns from "./footer-columns"
import SocialPart from "./social-part"

const Footer = () => {
  const { t } = useLanguage()
  
  return (
    <footer className="mt-8 w-[90%] mx-[auto] lg:block hidden">
      <div>
        <div className="flex flex-wrap py-4 w-full xl:max-w-[2100px] mx-auto">
          <SocialPart />
          <FooterColumns />
        </div>
      </div>
      <div className="border-t-[2px] border-t-primary text-center text-xs md:text-sm py-4 flex items-center justify-between flex-col-reverse md:flex-row gap-2 md:gap-0">
        <div>
          {t.copyRight}
          <span className="font-semibold">{t.companyInformation} </span>
          {t.providedBy}
          <span className="font-semibold">{t.WOWIVIETNAM}</span>
        </div>
        <div className="py-1 flex items-center h-[40px] gap-4">
          <a href="https://cafedx.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/icons/shopee-icon.svg" alt="/images/icons/shopee-icon.svg" className="cursor-pointer w-[40px] h-[40px]" />
          </a>
          <a href="https://cafedx.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/icons/lazada-icon.svg" alt="/images/icons/lazada-icon.svg" className="cursor-pointer w-[24px] h-[24px]" />
          </a>
          <div className="w-[1px] h-full bg-primary"></div>
          <a href="https://cafedx.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/icons/facebook-icon.svg" alt="/images/icons/facebook-icon.svg" className="cursor-pointer w-[24px] h-[24px]" />
          </a>
          <a href="https://cafedx.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/icons/instagram-icon.svg" alt="/images/icons/instagram-icon.svg" className="cursor-pointer w-[24px] h-[24px]" />
          </a>
          <a href="https://cafedx.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/icons/youtube-icon.svg" alt="/images/icons/youtube-icon.svg" className="cursor-pointer w-[24px] h-[24px]" />
          </a>
          <a href="https://cafedx.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/icons/tiktok-icon.svg" alt="/images/icons/tiktok-icon.svg" className="cursor-pointer w-[24px] h-[24px]" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
