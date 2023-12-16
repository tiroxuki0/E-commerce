import React, { useRef, useState } from "react"
import { HiChevronDown } from "react-icons/hi"
import { Transition } from "react-transition-group"
import FilterBox from "./filter-box"
import { useLanguage } from "hooks/useLanguage"
import { PRICE_OPTIONS } from "constants/base.constant"
import { useRouter } from "next/router"

const FilterOptions = () => {
  const { t } = useLanguage()
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false)
  const nodeRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const filter = router.query.filter

  function onClose() {
    setIsFilterBoxOpen((prev) => prev && false)
  }

  function onIconClickHandler() {
    setIsFilterBoxOpen((prev) => !prev)
  }

  const filterLabel = PRICE_OPTIONS.find((item: any) => item.value === filter)

  return (
    <div className="relative">
      <div className="w-full flex items-center cursor-pointer gap-3" onClick={onIconClickHandler}>
        <div className="w-full flex items-center justify-between cursor-pointer gap-3 rounded-[5px] py-[10px] px-[11px] border border-1 border-primary leading-[22px] text-[16px]">
          {filter ? filterLabel?.label : PRICE_OPTIONS[0].label}
          <HiChevronDown />
        </div>
      </div>
      <Transition nodeRef={nodeRef} in={isFilterBoxOpen} timeout={300} mountOnEnter unmountOnExit>
        {(state) => {
          return (
            <>
              <div className="fixed inset-0" onClick={onClose}></div>
              <div ref={nodeRef} className="z-[80] overflow-hidden absolute top-full left-0 min-w-[216px] bg-white rounded-lg shadow-filter w-full">
                <FilterBox onClose={onClose} />
              </div>
            </>
          )
        }}
      </Transition>
    </div>
  )
}

export default FilterOptions
