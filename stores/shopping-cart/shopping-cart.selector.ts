import { State } from './index'
export const selector = (state: State) => {
  return {
    shoppingCarts: state.shoppingCarts,
    totalQuantity: state.totalQuantity
  }
}
