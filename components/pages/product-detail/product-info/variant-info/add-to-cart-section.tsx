import React, {memo} from "react"
import {useLanguage} from "hooks/useLanguage"
import {useRouter} from "next/router"
import {flyToCartAnimation} from "helpers/product.helper"
import {useProduct} from "stores/product"
import {useShoppingCart} from "stores/shopping-cart"

const styleActionAmount = "text-[16px] disabled:cursor-not-allowed leading-[1.3] font-[600] text-primary w-[25px] h-[25px] flex items-center justify-center rounded-full border-primary border-[1px]"

const AddToCartSection = () => {
    const {t} = useLanguage()
    const [storeProduct, actionProduct] = useProduct()
    const [, actionShopCart] = useShoppingCart()
    const router = useRouter()

    const handleReduceAmount = () => {
        if (storeProduct.selectedVariant.counter) {
            if (storeProduct.selectedVariant.counter > 1) {
                actionProduct.setProductAmount(storeProduct.selectedVariant.counter - 1)
            } else {
                actionProduct.setProductAmount(1)
            }
        } else {
            actionProduct.setProductAmount(1)
        }
    }
    const handleIncreaseAmount = () => {
        if (storeProduct.selectedVariant.counter) {
            actionProduct.setProductAmount(storeProduct.selectedVariant.counter + 1)
        } else {
            actionProduct.setProductAmount(2)
        }
    }

    const handleAddToCart = async (e: any) => {
        await actionShopCart.addToCart(storeProduct.product, storeProduct.selectedVariant)
        flyToCartAnimation(e)
    }

    const handleBuyNow = async (e: any) => {
        await handleAddToCart(e)
        setTimeout(() => {
            router.push('/shop-cart')
        }, 800)
    }

    return (
        <div className="w-full pb-[5px]">
            <div className="flex items-center">
                <h4 className="text-[16px] font-[600] text-title">{t.amount}:</h4>
                <div className="flex items-center ml-[19px]">
                    <button className={styleActionAmount}
                            disabled={!storeProduct.selectedVariant.counter || storeProduct.selectedVariant.counter === 1}
                            onClick={handleReduceAmount}
                    >-</button>
                    <p className="font-[600] text-[16px] px-[22px]">{storeProduct.selectedVariant.counter || 1}</p>
                    <button className={styleActionAmount}
                            onClick={handleIncreaseAmount}
                    >+</button>
                </div>
            </div>
            <div className="flex items-center mt-[26px]">
                <button className="text-primary text-[16px] font-[600] leading-[1.3] capitalize w-1/2 py-[14px] rounded-[10px] border-primary"
                        onClick={handleAddToCart}
                >{t.addToCart}</button>
                <button className="ml-[18px] text-white text-[16px] font-[600] leading-[1.3] capitalize w-[calc(50%-18px)] py-[14px] rounded-[10px] bg-primary border-primary"
                        onClick={handleBuyNow}
                >{t.buyNow}</button>
            </div>
        </div>
    )
}

export default memo(AddToCartSection)
