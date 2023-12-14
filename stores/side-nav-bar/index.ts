import { openSidebar, openNavbar, closeSidebar, closeNavbar, setSidebarEntries } from "./site-nav-bar.action"
import { createHook, createStore } from "react-sweet-state"
import { selector } from "./side-nav-bar.selector"

export type State = {
  isSidebarOpen: boolean,
  isNavbarOpen: boolean,
  dropDownList: Array<any>
}

const initialState: State = {
  isSidebarOpen: false,
  isNavbarOpen: false,
  dropDownList: []
}

const actions = {
  openSidebar,
  openNavbar,
  closeSidebar,
  closeNavbar,
  setSidebarEntries
}

const Store = createStore({
  initialState,
  actions
})

export const useSideNavBar = createHook(Store, { selector: selector })
