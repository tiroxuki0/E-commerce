import {
  setProductsBest,
  setProductsIntroduce,
  getProductByCategoryAsync,
  setProductDetail,
  setProductPromotions,
  setProductOptions,
  handleVariantSelected,
  setProductAmount,
  setProducts
} from "./product.action"
import { createHook, createStore } from "react-sweet-state"
import { selector } from "./product.selector"
import {PRODUCT_MODEL, PRODUCT_VARIANT_MODEL, PRODUCT_OPTION_CUSTOM_MODEL} from "models/product.model"
import { PROMOTIONS_PRODUCT_MODEL } from "models/promotion.model"

export type State = {
  productsBest: Array<PRODUCT_MODEL>
  productsIntroduce: Array<PRODUCT_MODEL>
  products: Array<PRODUCT_MODEL>
  product: PRODUCT_MODEL
  promotions: PROMOTIONS_PRODUCT_MODEL
  selectedVariant: PRODUCT_VARIANT_MODEL
  productOptionsCustom: {
    options1: {values: Array<PRODUCT_OPTION_CUSTOM_MODEL>, label: string}
    options2: {values: Array<PRODUCT_OPTION_CUSTOM_MODEL>, label: string}
    options3: {values: Array<PRODUCT_OPTION_CUSTOM_MODEL>, label: string}
  }
}

const initialState: State = {
  productsBest: [],
  productsIntroduce: [],
  products: [],
  product: {id: ""},
  promotions: {},
  selectedVariant: {id: ""},
  productOptionsCustom: {
    options1: {values: [], label: ""},
    options2: {values: [], label: ""},
    options3: {values: [], label: ""}
  }
}

const actions = {
  setProductsBest,
  setProductsIntroduce,
  getProductByCategoryAsync,
  setProductDetail,
  setProductPromotions,
  setProductOptions,
  handleVariantSelected,
  setProductAmount,
  setProducts
}

const Store = createStore({
  initialState,
  actions
})

export const useProduct = createHook(Store, { selector: selector })
