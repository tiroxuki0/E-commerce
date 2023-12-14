import { State } from './index'
export const selector = (state: State) => {
  return {
    pageComponent: state.pageComponent
  }
}
