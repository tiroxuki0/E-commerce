import React, { memo } from "react"
import { useLanguage } from "hooks/useLanguage"
import FilterOptions from "./filter-btn"

const ProductFilter = ({ totalRecord }: { totalRecord: number }) => {
  const { t } = useLanguage()

  return (
    <div className="container container-full-phone">
      <div className="text-[#346448] flex items-start md:items-center gap-2 justify-start md:justify-between py-[30px] flex-col md:flex-row border-t-2 border-[#346448] mt-[30px] px-[20px] md:px-0">
        <div>{totalRecord || 0} {t.products}</div>
        <FilterOptions />
      </div>
    </div>
  )
}

export default memo(ProductFilter)
