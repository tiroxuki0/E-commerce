import {PROMOTION_MODEL} from "models/promotion.model"
import {PRODUCT_MODEL, PRODUCT_VARIANT_MODEL} from "models/product.model"

export interface SHOPPING_CART_MODEL {
    promotion?: PROMOTION_MODEL
    position: number
    sells: Array<SHOP_CART_ITEM_MODEL>
    gifts?: Array<SHOP_CART_ITEM_MODEL>
}

export interface SHOP_CART_ITEM_MODEL {
    number: number
    product: PRODUCT_MODEL
    variant: PRODUCT_VARIANT_MODEL
    promotion?: PROMOTION_MODEL | null
}