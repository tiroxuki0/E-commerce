import { toggleSettingBox } from "./setting-box.action"
import { createHook, createStore } from "react-sweet-state"
import { selector } from "./setting-box.selector"

export type State = {
  isOpen: boolean
}

const initialState: State = {
  isOpen: false
}

const actions = {
  toggleSettingBox
}

const Store = createStore({
  initialState,
  actions
})

export const useSettingBox = createHook(Store, { selector: selector })
