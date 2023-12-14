import Link from "next/link"
import React from "react"
import { useLanguage } from "hooks/useLanguage"
import CartItem from "./cart-item"
import {useCartUI} from "stores/cart-ui"
import {useShoppingCart} from "stores/shopping-cart"

const CartBox = () => {
  const { t, locale } = useLanguage()
  const [storeCart] = useShoppingCart()
  const [, actionCartUI] = useCartUI()

  function onCloseCartBoxHandler() {
    actionCartUI.toggleCartBox(false).then()
  }

  return (
    <div className="hidden lg:flex flex-col absolute top-full rtl:left-0 ltr:right-0 min-h-[15rem] max-h-[25rem] w-[20rem] bg-white z-[110] shadow-mega-menu rounded-lg overflow-auto">
      <div className="relative">
        <header className="flex items-center justify-between sticky top-0 left-0 right-0 text-sm font-normal z-10 p-2">
          <span>
            {t.product}
          </span>
          <span onClick={onCloseCartBoxHandler}>
            <Link href="/shop-cart">
              <a className="text-primary">{t.seeMore}</a>
            </Link>
          </span>
        </header>
        <hr className="mt-[5px]" />
        <div>
          <>
            {storeCart.shoppingCarts?.length ? (
             storeCart.shoppingCarts.map((shopCart, index) => {
                if (shopCart && shopCart.sells?.length > 0) {
                  return shopCart.sells.map((shopCartItem, itemIndex) => {
                    return <CartItem key={`${index}${itemIndex}`} item={shopCartItem} />
                  })
                } else return <></>
              })
            ) : <p className="mt-20 text-center text-primary"> {t.cartIsEmpty} </p>}
          </>
        </div>
      </div>
    </div>
  )
}

export default CartBox
