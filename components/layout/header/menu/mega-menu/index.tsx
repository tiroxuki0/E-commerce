import React from "react"
import MegaCollaboratorsMenu from "./mega-collaborators-menu"
import Link from "next/link"
import { useLanguage } from "hooks/useLanguage"
import {MENUS} from "constants/menu.constant"
import {DEFAULT_LANGUAGE} from "constants/base.constant"

const MegaMenu = () => {
  const { locale} = useLanguage()
  return (
    <div className="hidden md:flex items-center flex-grow">
        {
            MENUS.length > 0 &&
            MENUS.map((menu, index) => {
                return (
                    <Link href={menu.link_url || ""} key={index}>
                        <a className="mr-[15px] lg:mr-[35px] text-[15px] lg:text-[16px] text-center">{menu.title[locale || DEFAULT_LANGUAGE]}</a>
                    </Link>
                )
            })
        }
        <MegaCollaboratorsMenu />
    </div>
  )
}

export default MegaMenu
