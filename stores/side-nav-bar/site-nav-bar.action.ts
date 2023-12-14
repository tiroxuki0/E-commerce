import { BaseAction } from ".."
import { State } from "./index"
import {IDropDown} from "models/dropdown.model"

type Actions = BaseAction<State>

export const openSidebar = () =>
  async ({ setState, getState }: Actions) => {
      setState({
          ...getState(),
          isSidebarOpen: true
      })
  }

export const openNavbar = () =>
  async ({ setState, getState }: Actions) => {
      setState({
          ...getState(),
          isNavbarOpen: true
      })
  }

export const closeSidebar = () =>
  async ({ setState, getState }: Actions) => {
      setState({
          ...getState(),
          isSidebarOpen: false
      })
  }

export const closeNavbar = () =>
  async ({ setState, getState }: Actions) => {
      setState({
          ...getState(),
          isSidebarOpen: false,
          isNavbarOpen: false
      })
  }

export const setSidebarEntries = (payload: IDropDown[]) =>
  async ({ setState, getState }: Actions) => {
      setState({
          ...getState(),
          dropDownList: payload
      })
  }