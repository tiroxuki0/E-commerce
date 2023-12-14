import {
  addToCart,
  getShoppingCarts
} from "./shopping-cart.action"
import { createHook, createStore } from "react-sweet-state"
import { selector } from "./shopping-cart.selector"
import {SHOPPING_CART_MODEL} from "models/shopping-cart.model"

export type State = {
  shoppingCarts: Array<SHOPPING_CART_MODEL>
  totalQuantity: number
}

const initialState: State = {
  shoppingCarts: [],
  totalQuantity: 0
}

const actions = {
  addToCart,
  getShoppingCarts
}

const Store = createStore({
  initialState,
  actions
})

export const useShoppingCart = createHook(Store, { selector: selector })
