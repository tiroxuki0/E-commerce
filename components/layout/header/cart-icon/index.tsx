import React, { useRef } from "react"
import Link from "next/link"
import { Transition } from "react-transition-group"
import CartBox from "./cart-box"
import {useCartUI} from "stores/cart-ui"
import {useShoppingCart} from "stores/shopping-cart"

const CartIcon = () => {
  const [storeCartUI, actionCartUI] = useCartUI()
  const [storeCart] = useShoppingCart()

  const nodeRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative" id="cartIconJs" onMouseOver={() => actionCartUI.toggleCartBox(true)} onMouseOut={() => actionCartUI.toggleCartBox(false)}>
      <Link href="/shop-cart">
        <a className="relative flex items-center z-50 w-[24px] h-[24px]" id="cartIconJs">
          <img src="/images/icons/cart-icon.svg" alt="/images/icons/cart-icon.svg" className="cursor-pointer w-[24px] h-[24px]" />
          <span className="absolute -top-[8px] -right-[8px] flex items-center justify-center w-[20px] h-[20px] rounded-full bg-primary text-[12px] font-[600] leading-[1.3] text-white shadow-lg">
            {storeCart.totalQuantity || 0}
          </span>
        </a>
      </Link>
      <Transition nodeRef={nodeRef} in={storeCartUI.cartBoxIsVisible} timeout={300} mountOnEnter unmountOnExit>
        {(state) => {
          return (
            <div ref={nodeRef} className="z-[100]">
              <CartBox />
            </div>
          )
        }}
      </Transition>
    </div>
  )
}

export default CartIcon
