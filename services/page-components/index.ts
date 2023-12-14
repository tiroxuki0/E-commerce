import {KEY_HOME_COMPONENT, KEY_SCREEN} from 'constants/page-component.constant'
import {ROUTE_API} from 'constants/route-api.contant'
import {BASE_CONSTANTS} from "constants/base.constant"
import API from 'configs/api/repository-api'
import {resPageComponent} from './page-component.type'

const url = ROUTE_API.screen

export const getSettingScreenService = async (
  screen: KEY_SCREEN,
  settingScreen?: KEY_HOME_COMPONENT
): Promise<resPageComponent> => {
  return (await API.get(`${url}/local`, {
    screen: screen,
    website: BASE_CONSTANTS.WEBSITE_KEY,
    setting_screen: settingScreen
  })) as Promise<resPageComponent>
}
