import React from "react"
import { useLanguage } from "hooks/useLanguage"
import Logo from "./logo"

const SocialPart = () => {
  const { t } = useLanguage()

  return (
    <div className="mr-20 mb-10 max-w-none lg:max-w-[230px] w-full">
      <div>
        <div className="flex text-primary text-[16px] text-justify font-bold uppercase">
            Card người già
        </div>
        <div className="flex text-primary text-[16px] text-justify">
            {t.footerDescription}
        </div>
      </div>
    </div>
  )
}

export default SocialPart
