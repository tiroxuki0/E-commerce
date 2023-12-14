import { State } from './index'
export const selector = (state: State) => {
  return {
    cartBoxIsVisible: state.cartBoxIsVisible
  }
}
