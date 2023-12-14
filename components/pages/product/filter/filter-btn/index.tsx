import React, { useRef, useState } from "react"
import { HiChevronDown } from "react-icons/hi"
import { Transition } from "react-transition-group"
import FilterBox from "./filter-box"
import { useLanguage } from "hooks/useLanguage"
import { FILTER_OPTIONS } from "constants/base.constant"
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

  const filterLabel = FILTER_OPTIONS.find((item: any) => item.value === filter)

  return (
    <div className="relative">
      <div className="flex items-center cursor-pointer gap-3" onClick={onIconClickHandler}>
        <div className="hidden md:block">{t.filter}</div>
        <div className="flex items-center cursor-pointer gap-3 rounded-[5px] px-[10px] py-[7px] border border-1 border-primary">
          {filter ? t[`${filterLabel?.label}`] : t[`${FILTER_OPTIONS[0].label}`]}
          <HiChevronDown />
        </div>
      </div>
      <Transition nodeRef={nodeRef} in={isFilterBoxOpen} timeout={300} mountOnEnter unmountOnExit>
        {(state) => {
          return (
            <>
              <div className="fixed inset-0" onClick={onClose}></div>
              <div ref={nodeRef} className="z-[80] overflow-hidden absolute top-full right-0 md:right-0 w-[216px] bg-white rounded-lg shadow-filter">
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
