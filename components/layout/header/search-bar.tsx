import React from "react"
import { useLanguage } from "hooks/useLanguage"
import { Transition } from "react-transition-group"

const SearchBar = () => {
  const { t } = useLanguage()
  const [toggle, setToggle] = React.useState(false)
  const nodeRef = React.useRef<HTMLDivElement>(null)

  function onMouseHoverHandler(toggle: boolean) {
    setToggle(toggle)
  }

  return (
    <div
      className="w-full rounded-[5px] md:rounded-0 px-[13px] py-[6px] md:p-0 relative cursor-pointer md:w-[24px] md:h-[24px] flex-shrink-0 bg-bottom-navbar md:bg-transparent flex items-center justify-center flex-grow md:block"
      onMouseOver={() => onMouseHoverHandler(true)}
      onMouseOut={() => onMouseHoverHandler(false)}
    >
      <Transition nodeRef={nodeRef} in={toggle} timeout={300} mountOnEnter unmountOnExit>
        {(state) => {
          return (
            <div ref={nodeRef} className="hidden md:block absolute top-[50%] transform translate-y-[-50%] right-[-5px] z-[99] w-[400px] md:bg-bottom-navbar rounded-[5px]">
              <input className={`pl-4 pr-7 py-3 bg-transparent outline-none w-full`}
                     type="search"
                     placeholder={`${t.search}`} />
            </div>
          )
        }}
      </Transition>
      <div ref={nodeRef} className="md:hidden md:absolute md:top-[50%] md:transform md:translate-y-[-50%] md:right-[24px] md:z-[99] w-[100px] flex-1">
        <input className={`px-2 py-1 bg-transparent outline-none md:border-b-2 md:border-b-slate-300 w-full`}
               type="search"
               placeholder={`${t.search}`} />
      </div>
      <img src="/images/icons/search-icon.svg" alt="/images/icons/search-icon.svg" className="cursor-pointer w-[24px] h-[24px] flex-shrink-0 relative z-[99]" />
    </div>
  )
}

export default SearchBar
