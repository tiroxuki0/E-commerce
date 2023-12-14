import { toggleCartBox } from "./cart-ui.action"
import { createHook, createStore } from "react-sweet-state"
import { selector } from "./cart-ui.selector"

export type State = {
  cartBoxIsVisible: boolean
}

const initialState: State = {
  cartBoxIsVisible: false
}

const actions = {
  toggleCartBox
}

const Store = createStore({
  initialState,
  actions
})

export const useCartUI = createHook(Store, { selector: selector })
