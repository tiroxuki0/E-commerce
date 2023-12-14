import {FLASH_SALE_MODEL} from "models/promotion.model"
import {FLASH_SALE_STATUS} from "constants/promotion.constant"

interface Notification {
  time_start?: Date
  time_end?: Date
}
export const checkStatusFlashSale = (flashSale: FLASH_SALE_MODEL) => {
  if (flashSale) {
    let notifications: Notification = {}
    let countdownTimeStart = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${flashSale?.time_start}`)
    let countdownTimeEnd = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${flashSale?.time_end}`)
    if ((new Date().getHours() >= new Date(countdownTimeEnd).getHours()) && (new Date().getMinutes() >= new Date(countdownTimeEnd).getMinutes())) {
      countdownTimeStart = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1} ${flashSale?.time_start}`)
    }
    if (new Date(flashSale?.date_start).getDate() > new Date().getDate()) {
      let date_start = flashSale?.date_start
      countdownTimeStart = new Date(`${new Date(date_start).getFullYear()}-${new Date(date_start).getMonth() + 1}-${new Date(date_start).getDate()} ${flashSale?.time_start}`)
    }
    notifications.time_start = new Date(countdownTimeStart?.getFullYear(), countdownTimeStart?.getMonth(), countdownTimeStart?.getDate(), countdownTimeStart?.getHours(), countdownTimeStart?.getMinutes(), countdownTimeStart?.getSeconds())
    notifications.time_end = new Date(countdownTimeEnd?.getFullYear(), countdownTimeEnd?.getMonth(), countdownTimeEnd?.getDate(), countdownTimeEnd?.getHours(), countdownTimeEnd?.getMinutes(), countdownTimeEnd?.getSeconds())
    if ((notifications.time_start.getTime() <= new Date().getTime()) && (notifications.time_end.getTime() >= new Date().getTime())) {
      return FLASH_SALE_STATUS.HAPPENING
    } else {
      return FLASH_SALE_STATUS.UPCOMING
    }
  } else return FLASH_SALE_STATUS.UN_ACTIVE
}

export const getTimeFlashSale = (flashSale: FLASH_SALE_MODEL) => {
  if (flashSale?.id) {
    let notifications: any = {}

    let countdownTimeEnd = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${flashSale?.time_end}`)
    let countdownTimeStart = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${flashSale?.time_start}`)
    if ((new Date().getHours() >= new Date(countdownTimeEnd).getHours()) && (new Date().getMinutes() >= new Date(countdownTimeEnd).getMinutes())) {
      countdownTimeStart = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1} ${flashSale?.time_start}`)
    }
    if (new Date(flashSale?.date_start).getDate() > new Date().getDate()) {
      let date_start = flashSale?.date_start
      countdownTimeStart = new Date(`${new Date(date_start).getFullYear()}-${new Date(date_start).getMonth() + 1}-${new Date(date_start).getDate()} ${flashSale?.time_start}`)
    }
    notifications.content = flashSale.name
    notifications.time_end = new Date(countdownTimeEnd?.getFullYear(), countdownTimeEnd?.getMonth(), countdownTimeEnd?.getDate(), countdownTimeEnd?.getHours(), countdownTimeEnd?.getMinutes(), countdownTimeEnd?.getSeconds())
    notifications.time_start = new Date(countdownTimeStart?.getFullYear(), countdownTimeStart?.getMonth(), countdownTimeStart?.getDate(), countdownTimeStart?.getHours(), countdownTimeStart?.getMinutes(), countdownTimeStart?.getSeconds())

    return notifications
  } else return {}
}