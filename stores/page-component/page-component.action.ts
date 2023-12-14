import {
  KEY_HOME_COMPONENT
} from 'constants/page-component.constant'
import { BaseAction } from '..'
import { State } from './index'
import {PAGE_COMPONENT_MODEL} from "models/page-component.model"

type Actions = BaseAction<State>

export const setPageComponentHome = (data: PAGE_COMPONENT_MODEL) => {
  return (actions: Actions) => {
    if (data.items && data.items.length > 0) {
      const bannersTop = data.items?.find(item => item.setting_screen === KEY_HOME_COMPONENT.HOME_TOP_BANNER)?.item_details
      const itemProductBest = data.items?.find(item => item.setting_screen === KEY_HOME_COMPONENT.HOME_PRODUCT_BEST)
      const itemProductIntroduce = data.items?.find(item => item.setting_screen === KEY_HOME_COMPONENT.HOME_PRODUCT_INTRODUCE)
      const itemHomeIntroduce = data.items?.find(item => item.setting_screen === KEY_HOME_COMPONENT.HOME_INTRODUCE)
      const itemHomeAboutUs = data.items?.find(item => item.setting_screen === KEY_HOME_COMPONENT.HOME_ABOUT_US)
      const itemHomePartner = data.items?.find(item => item.setting_screen === KEY_HOME_COMPONENT.HOME_PARTNER)?.item_details
      const itemHomeStore = data.items?.find(item => item.setting_screen === KEY_HOME_COMPONENT.HOME_STORE)
      actions.setState({
        ...actions.getState(),
        pageComponent: {
          ...actions.getState().pageComponent,
          bannersTop: bannersTop,
          itemProductBest: itemProductBest,
          itemProductIntroduce: itemProductIntroduce,
          itemHomeIntroduce: itemHomeIntroduce,
          itemHomeAboutUs: itemHomeAboutUs,
          itemHomePartner: itemHomePartner,
          itemHomeStore: itemHomeStore
        }
      })
    }
  }
}

export const setBannerProductMore = (data: PAGE_COMPONENT_MODEL) => {
  return (actions: Actions) => {
    if (data?.items && data.items.length > 0) {
      const bannerProductMore = data.items?.find(item => item.setting_screen === KEY_HOME_COMPONENT.HOME_PRODUCT_MORE)
      actions.setState({
        ...actions.getState(),
        pageComponent: {
          ...actions.getState().pageComponent,
          bannerProductMore: bannerProductMore
        }
      })
    }
  }
}
