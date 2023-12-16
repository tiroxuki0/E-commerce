import React from "react"
import Link from "next/link"
import { HiChevronUp, HiChevronDown } from "react-icons/hi"
import { Transition } from "react-transition-group"
import {useSideNavBar} from "stores/side-nav-bar"
import {MENUS} from "constants/menu.constant"
import {DEFAULT_EMAIL, DEFAULT_LANGUAGE, DEFAULT_PHONE_NUMBER} from "constants/base.constant"
import {useLanguage} from "hooks/useLanguage"

const SideNavContent = () => {
  const [, actionSideNavBar] = useSideNavBar()
  const [openDropdown, setOpenDropDown] = React.useState(false)
  const nodeRef = React.useRef<HTMLDivElement>(null)
  let ArrowDirection = !openDropdown ? HiChevronDown : HiChevronUp
  const {t, locale} = useLanguage()

  const closeNavbar = () => actionSideNavBar.closeNavbar()

  return (
    <div className="absolute w-full">
      <div className="flex flex-col mt-3 pt-3 ltr:px-5 rtl:px-5 cursor-pointer">
        {
          MENUS.length > 0 &&
          MENUS.map((menu, index) => {
            return (
                <Link href={menu.link_url || ""} key={index}>
                  <a className="text-md grow text-black bg-item rounded-[5px] py-3 px-[19px] my-[7.5px]">{menu.title[locale || DEFAULT_LANGUAGE]}</a>
                </Link>
            )
          })
        }
        
        <Transition mountOnEnter unmountOnExit in={openDropdown} timeout={300} nodeRef={nodeRef}>
          {(state) => (
            <>
              <div
                ref={nodeRef}
                className={`origin-top ${state === "entering" ? `animate-dropDown` : state === "entered" ? "scale-y-100 opacity-100" : "animate-dropDownExit"}`}
              >
                <div className="ltr:pl-6 rtl:pr-6 py-3">
                  <Link href="/cong-tac-vien/chinh-sach">
                    <a onClick={closeNavbar}>{t.policyForCollaborators}</a>
                  </Link>
                </div>
                <div className="ltr:pl-6 rtl:pr-6 py-3">
                  <Link href="/cong-tac-vien/dang-ky">
                    <a onClick={closeNavbar}>{t.registerAsACollaborator}</a>
                  </Link>
                </div>
              </div>
            </>
          )}
        </Transition>
        <div className="mt-2 md:mt-0 max-w-[350px] w-full px-5">
          <h2 className="text-[18px] font-semibold pb-2 inline-block max-w-max">{t.contactInformation}</h2>
          <div className="flex flex-col">
            <Link href={`mailto:${DEFAULT_EMAIL}`}>
              <a className="text-[14px] text-justify text-black py-2 hover:underline">
                <span className="font-bold">Email:</span> {DEFAULT_EMAIL}
              </a>
            </Link>
            <Link href={`tel:${DEFAULT_PHONE_NUMBER}`}>
              <a className="text-[14px] text-justify text-black py-2 hover:underline">
                <span className="font-bold">{t.phoneNumber}:</span> {DEFAULT_PHONE_NUMBER}
              </a>
            </Link>
          </div>
        </div>
        <div className="py-3 px-2 flex items-center justify-start h-[40px] gap-4">
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
    </div>
  )
}

export default SideNavContent
