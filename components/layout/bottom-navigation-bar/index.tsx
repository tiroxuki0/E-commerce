import React from "react"
import { useLanguage } from "hooks/useLanguage"
import {BOTTOM_NAVBAR_ITEMS} from "constants/menu.constant"
import {DEFAULT_LANGUAGE} from "constants/base.constant"
import {useRouter} from "next/router"
import Image from "next/image"
import {useAuth} from "stores/auth"

const Footer = () => {
  const { locale } = useLanguage()
  const router = useRouter()
  const [stateAuth, actionAuth] = useAuth()

  const handleRouter = (item: any) => {
      if (item.auth) {
          if (stateAuth.isLogin && stateAuth.userData?.id) {
              router.push(item.link_url)
          } else {
              actionAuth.showModalAuth("login")
          }
      } else {
          router.push(item.link_url)
      }
  }

  return (
      <>
          <div className="lg:hidden h-[57px] bg-primary-light w-full"/>
          <div className="lg:hidden h-[24px] w-full"/>
          <footer className="lg:hidden pb-[20px] px-[20px] fixed bottom-0 left-0 right-0 z-[99]">
              <div className="flex items-center justify-between p-[12px] bg-white shadow-bottom-navbar rounded-[10px]">
                  {
                      BOTTOM_NAVBAR_ITEMS.length > 0 &&
                      BOTTOM_NAVBAR_ITEMS.map((item, index) => {
                          const active = (item.link_url !== '/' && router.pathname !== '/') ? router.pathname?.includes(item.link_url) : router.pathname === item.link_url
                          return (
                              <div key={index}
                                   onClick={() => handleRouter(item)}
                                   className={`${active ? '' : ''} flex items-center bg-bottom-navbar rounded-r-[11.8vw] rounded-l-[11.8vw] relative`}>
                                  <div className="relative w-[11.8vw] h-[11.8vw] max-w-[46px] max-h-[46px] rounded-full">
                                      <Image src={active ? item.icon_active : item.icon}
                                             layout="fill"
                                             objectFit="cover"
                                             alt="icon"/>
                                  </div>
                                  {
                                      active && <span className="pl-[5px] pr-[13px] text-[14px] text-primary font-[600] capitalize">{item.title[locale || DEFAULT_LANGUAGE]}</span>
                                  }
                                  {
                                      item.has_counter && <div className="w-[17px] h-[17px] min-w-[17px] rounded-full bg-counter flex items-center text-center justify-center leading-[1.25] font-[700] text-white text-[12px] absolute top-[-2px] right-[-3px]">{1}</div>
                                  }
                              </div>
                          )
                      })
                  }
              </div>
          </footer>
      </>
  )
}

export default Footer
