import React, { memo, useState } from "react"
import { useLanguage } from "hooks/useLanguage"
import { CATEGORY_OPTIONS } from "constants/base.constant"
import { useRouter } from "next/router"

const Categories = () => {
  const { t } = useLanguage()
  const router = useRouter()
  const [active, setActive] = useState(router.query.category as string)

  const handleFilter = (item: any) => {
    if (active === item.fillName) {
      setActive("")
      const { category, ...rest } = router.query
      router.push({
        pathname: "/product",
        query: { ...rest }
      })
      return
    }
    router.push({
      pathname: "/product",
      query: { ...router.query, category: item.fillName }
    })
    setActive(item.fillName as string)
  }

  React.useEffect(() => {
    setActive(router.query.category as string)
  }, [router])
  
  return (
    <div className="container container-full-phone">
      <h3 className="text-[#346448] text-[23px] font-semibold uppercase text-center mt-[55px]">{t.categories}</h3>
      <div className="container container-full-phone">
        <div className="w-full flex lg:flex-row flex-col-reverse justify-between mt-[20px]">
          <div className="w-full flex flex-col justify-between lg:pb-[6px] pb-0 overflow-hidden lg:mt-0 mt-[19px]">
            <div className="scroll-auto-small w-full mx-0 lg:mx-[auto] lg:w-2/3 lg:grid grid-cols-5 flex overflow-x-auto lg:gap-[36px] gap-[38px] lg:px-0 px-[20px] lg:pb-0 pb-[10px]">
              {CATEGORY_OPTIONS.map((item: any, index: number) => {
                return (
                  <div key={index} className="max-w-[100%] w-full lg:max-w-[125px] h-full flex flex-col items-center justify-start cursor-pointer" onClick={() => handleFilter(item)}>
                    <div className="lg:w-[90%] w-[100px] h-[100px] lg:h-0 lg:pt-[90%] relative overflow-hidden mx-[auto]">
                      <div className={`category-item w-full h-full top-0 left-0 right-0 bottom-0 rounded-common absolute ${active?.toUpperCase() === item.fillName.toUpperCase() ? "active" : ""}`}>
                        <img src={`/images/icons/product-${item.icon}.svg`} className="object-contain mx-[auto] absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]" />
                      </div>
                    </div>
                    <p className={`uppercase text-center text-[12px] lg:text-[14px] text-[#346448] ${active === item.fillName ? "font-bold" : ""}`}>{t[`${item.label}`]}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Categories)
