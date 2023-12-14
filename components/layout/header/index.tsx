import React, {useEffect} from "react"
import dynamic from "next/dynamic"
import Menu from "./menu"
import Logo from "./logo"
import SearchBar from "./search-bar"
import CartIcon from "./cart-icon"
import Language from "./language"
import MegaMenu from "./menu/mega-menu"
import { useAuth } from "stores/auth"
import ModalLogin from "components/common/modal/components/ModalLogin/ModalLogin"
import { useLanguage } from "hooks/useLanguage"
import Link from "next/link"
import Image from "next/image"
import {useRouter} from "next/router"
import {useShoppingCart} from "stores/shopping-cart";

const UserBox = dynamic(() => import("./user"), {
  ssr: false
})

interface Props {
  isDetailScreen: boolean
}

const Header = ({isDetailScreen = false}: Props) => {
  const router = useRouter()
  const { t } = useLanguage()
  const [stateAuth, actionAuth] = useAuth()
  const [, actionShopCart] = useShoppingCart()

  useEffect(() => {
    actionShopCart.getShoppingCarts()
  } , [])

  const handleClose = () => {
    actionAuth.showModalAuth('login').then()
  }

  const handleRouterBack = () => router.back()

  return (
    <>
      <header className="w-full">
        <div className="w-full md:bg-dark-primary bg-black flex items-center justify-center relative">
          <div className="md:flex text-white hidden items-center justify-center gap-10 w-full h-[30px] md:h-100%">
            <div className="text-white text-[14px] font-normal py-[5px] text-center hidden md:block">{t.buyAndGift}</div>
            <div className="hidden md:block w-[1px] h-full bg-white"></div>
            <div className="text-white text-[14px] font-normal py-[5px] text-center hidden md:block">{t.freeShipping}</div>
            <div className="hidden md:block w-[1px] h-full bg-white"></div>
            <div className="text-white text-[14px] font-normal py-[5px] text-center hidden md:block">{t.discountOnPercent}</div>
          </div>
          <div className="hidden md:flex md:items-center md:justify-between absolute right-1 top-[50%] transform translate-y-[-50%] z-[101]">
            <Language />
          </div>
        </div>
        <div className="hidden md:block w-full bg-menu">
          <div className="text-white flex items-center justify-end w-[90%] gap-[30px] py-[19px] mx-[auto]">
            <div className="text-[15px] lg:text-[16px] text-primary cursor-pointer">{t.orderTracking}</div>
            <div className="text-[15px] lg:text-[16px] text-primary cursor-pointer">{t.contactUs}</div>
            <div className="text-[15px] lg:text-[16px] text-primary cursor-pointer">
              <UserBox />
            </div>
          </div>
        </div>
      </header>
      <div className="w-full sticky py-0 md:py-[10px] top-0 z-[9999] bg-white lg:shadow-header-desktop shadow-header">
        <div className="flex flex-col px-0 lg:w-[90%] mx-[auto]">
          <div className={`w-full flex items-center justify-between md:order-2 h-[73px] md:hidden ${!isDetailScreen ? "px-[20px]" : ""}`}>
            {
                isDetailScreen &&
                <>
                  <button className="flex items-center justify-center w-[73px] h-full" onClick={handleRouterBack}>
                    <Image src="/images/icons/ic-arrow-left.svg"
                           alt="backIcon"
                           width={35}
                           height={35}
                           objectFit="cover"/>
                  </button>
                  <div className="md:hidden">
                    <Logo />
                  </div>
                  <div className="w-[73px] h-full"/>
                </>
            }
            {
                !isDetailScreen &&
                <>
                  <div className="md:hidden">
                    <Logo />
                  </div>
                  <div className="w-full h-full md:hidden flex items-center ml-[15px] mr-[5px] md:mx-0">
                    <SearchBar />
                  </div>
                  <Link href="/gio-hang">
                    <a className="mx-[10px] w-[39px] min-w-[39px] h-[39px] lg:hidden relative">
                      <Image src="/images/icons/ic-shopcart.svg" layout="fill" objectFit="cover" alt="shopCartIcon"/>
                    </a>
                  </Link>
                  <Menu />
                </>
            }
          </div>
          <div className="mt-0 flex items-center md:order-1">
            <div className="hidden md:block">
              <Logo />
            </div>
            <div className="ml-[30px] lg:ml-[60px] flex-grow">
              <MegaMenu />
            </div>
            <div className="hidden md:flex ltr:ml-2 rtl:mr-2 sm:ltr:ml-4 sm:rtl:mr-4 items-center justify-between gap-[10px] lg:gap-[20px]">
              <SearchBar />
              <CartIcon />
              <img src="/images/icons/bell-icon.svg" alt="/images/icons/bell-icon.svg" className="cursor-pointer w-[24px] h-[24px]" />
            </div>
          </div>
        </div>
      </div>
      {!stateAuth.isLogin && <ModalLogin status={stateAuth.isModalLogin} close={handleClose} />}
    </>
  )
}

export default Header
