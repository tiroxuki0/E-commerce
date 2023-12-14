import React, { memo } from "react"
import ProductCard from "components/common/product/product-card"
import { useRouter } from "next/router"
import { CATEGORY_OPTIONS } from "constants/base.constant"
import { useLanguage } from "hooks/useLanguage"
import { PRODUCT_MODEL } from "models/product.model"
import { HiOutlineChevronRight } from "react-icons/hi"

const ProductByCategory = ({ type, icons, data }: { type: string; icons: boolean; data: Array<PRODUCT_MODEL> }) => {
  const { t } = useLanguage()
  const router = useRouter()
  const products = data
  const category = router.query.category
  const currentCategory = CATEGORY_OPTIONS.find((item: any) => item.label === type)

  const handleSeeMore = () => {
    router.push({
      pathname: "/product",
      query: { ...router.query, category: currentCategory?.fillName }
    })
  }

  if (!products || products?.length === 0) return <></>

  return (
    <div className="lg:mb-[75px] mb-[37px]">
      <div className="container container-full-phone">
        <div className="flex items-center justify-between">
          {!category && <h3 className="text-primary lg:px-0 px-[20px] lg:text-[23px] text-[16px] font-[600] uppercase text-left">{currentCategory ? t[`${currentCategory.title}`] : ""}</h3>}{" "}
          {!category && (
            <div className="cursor-pointer flex items-center justify-center gap-1" onClick={handleSeeMore}>
              {t.seeMore}
              <HiOutlineChevronRight />
            </div>
          )}
        </div>
        <div className="w-full flex lg:flex-row flex-col-reverse justify-between mt-[20px]">
          <div className="w-full flex flex-col justify-between lg:pb-[6px] pb-0 overflow-hidden lg:mt-0 mt-[19px]">
            <div className="scroll-auto-small lg:grid grid-cols-4 flex overflow-x-auto lg:gap-[36px] gap-[38px] lg:px-0 px-[20px] py-[20px]">
              {
                products.map((product, index) => {
                  return <ProductCard item={product} key={index} icons={icons} />
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ProductByCategory)
