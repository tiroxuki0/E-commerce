import React, { useRef } from "react"
import { Transition } from "react-transition-group"
import { useLanguage } from "hooks/useLanguage"
import {useMegaMenu} from "stores/mega-menu"
import Link from "next/link"

const MegaCollaboratorsMenu = () => {
  const nodeRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const [storeMegaMenu, actionMegaMenu] = useMegaMenu()
  function showMegaMenuHandler() {
    actionMegaMenu.openCollaboratorsMegaMenu().then()
  }
  function closeMegaMenuHandler() {
    actionMegaMenu.closeCollaboratorsMegaMenu().then()
  }

  return (
    <div
      className="flex items-center relative"
      onMouseOver={showMegaMenuHandler}
      onMouseOut={closeMegaMenuHandler}
    >
      <div className="flex items-center cursor-pointer">
        <h3 className="text-[15px] lg:text-[16px] mr-[3px] lg:mr-[7px]">{t.collaborators}</h3>
        <img src="/images/icons/chevron-down.svg" alt="/images/icons/chevron-down.svg" className="cursor-pointer w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]" />
      </div>

      <Transition
        nodeRef={nodeRef}
        in={storeMegaMenu.isMegaCollaboratorsMenuOpen!}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        {(state) => {
          return (
            <div ref={nodeRef} className="z-[100]">
              <div
                className={`fixed top-[11rem] inset-0
                ${
                  state === "entering"
                    ? "animate-fadeEntering"
                    : state === "entered"
                    ? "opacity-100"
                    : "animate-fadeExit"
                }`}
                onClick={closeMegaMenuHandler}
              />
              <div className="absolute flex flex-col top-[58px] left-0 bg-white z-[110] shadow-mega-menu">
                <Link href="/cong-tac-vien/chinh-sach">
                  <a className="p-[15px] hover:bg-item text-[16px] text-black whitespace-nowrap">{t.policyForCollaborators}</a>
                </Link>
                <Link href="/cong-tac-vien/dang-ky">
                  <a className="p-[15px] hover:bg-item text-[16px] text-black whitespace-nowrap">{t.registerAsACollaborator}</a>
                </Link>
              </div>
            </div>
          )
        }}
      </Transition>
    </div>
  )
}

export default MegaCollaboratorsMenu
