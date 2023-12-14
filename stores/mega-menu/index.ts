import {
  openMegaMenu,
  closeMegaMenu,
  openCollaboratorsMegaMenu,
  closeCollaboratorsMegaMenu
} from "./mega-menu.action"
import { createHook, createStore } from "react-sweet-state"
import { selector } from "./mega-menu.selector"

export type State = {
  isMegaMenuOpen: boolean,
  isMegaCollaboratorsMenuOpen: boolean
}

const initialState: State = {
  isMegaMenuOpen: false,
  isMegaCollaboratorsMenuOpen: false
}

const actions = {
  openMegaMenu,
  closeMegaMenu,
  openCollaboratorsMegaMenu,
  closeCollaboratorsMegaMenu
}

const Store = createStore({
  initialState,
  actions
})

export const useMegaMenu = createHook(Store, { selector: selector })
