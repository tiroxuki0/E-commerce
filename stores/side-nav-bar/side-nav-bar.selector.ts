import { State } from './index'
export const selector = (state: State) => {
  return {
    isSidebarOpen: state.isSidebarOpen,
    isNavbarOpen: state.isNavbarOpen,
    dropDownList: state.dropDownList
  }
}
