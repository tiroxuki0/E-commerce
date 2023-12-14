import {ITEM_DETAILS_MODEL, ITEM_MODEL} from 'models/page-component.model'
import {
  setPageComponentHome,
  setBannerProductMore
} from './page-component.action'
import { createHook, createStore } from 'react-sweet-state'
import { selector } from './page-component.selector'

export type State = {
  pageComponent: {
    bannersTop: Array<ITEM_DETAILS_MODEL>,
    itemProductBest: ITEM_MODEL,
    itemProductIntroduce: ITEM_MODEL,
    itemHomeIntroduce: ITEM_MODEL,
    itemHomeAboutUs: ITEM_MODEL,
    itemHomeStore: ITEM_MODEL,
    itemHomePartner: Array<ITEM_DETAILS_MODEL>
    bannerProductMore: ITEM_DETAILS_MODEL
  }
}

const initialState: State = {
  pageComponent: {
    bannersTop: [],
    itemProductBest: {id: 0},
    itemProductIntroduce: {id: 0},
    itemHomeIntroduce: {id: 0},
    itemHomeAboutUs: {id: 0},
    itemHomeStore: {id: 0},
    itemHomePartner: [],
    bannerProductMore: {id: 0, position: 0}
  }
}

const actions = {
  setPageComponentHome,
  setBannerProductMore
}

const Store = createStore({
  initialState,
  actions
})

export const usePageComponent = createHook(Store, { selector: selector })
