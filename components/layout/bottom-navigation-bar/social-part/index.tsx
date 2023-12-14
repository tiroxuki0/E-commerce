import React from "react"
import { useLanguage } from "hooks/useLanguage"
import Logo from "./logo"

const SocialPart = () => {
  const { t } = useLanguage()

  return (
    <div className="mr-48 mb-10 max-w-none lg:max-w-[330px] w-full">
      <div>
        <Logo />
        <div className="flex mt-3 text-primary text-[16px] text-justify">
            {t.footerDescription}
        </div>
      </div>
    </div>
  )
}

export default SocialPart
