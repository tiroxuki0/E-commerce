import {KEY_COOKIE} from "constants/key-cookie.constant"
import {BASE_CONSTANTS} from "constants/base.constant"
import {destroyCookie, parseCookies, setCookie} from 'nookies'
import {IDestroyCookieOptions, IParseCookieOptions, ISetCookieOptions} from "models/cookie.model"
import moment from "moment"

export const saveToLocalStorage = (key: string, value: any) =>
    window.localStorage.setItem(key, JSON.stringify(value))

export const getFromLocalStorage = (key: string): any => {
  try {
    if (typeof window === 'undefined') return null
    const value = window.localStorage.getItem(key)
    if (!value) return null
    return JSON.parse(value)
  } catch (e) {
    return null
  }
}

export const removeFromLocalStorage = (key: string) => {
  window.localStorage.removeItem(key)
}

export const saveToSessionStorage = (key: string, value: any) =>
    window.sessionStorage.setItem(key, JSON.stringify(value))


export const getFromSessionStorage = (key: string): any => {
  const value = window.sessionStorage.getItem(key)
  if (!value) return null
  return JSON.parse(value)
}

export const getFromCookieWithName = (
    context: any,
    nameCookie: KEY_COOKIE,
    options?: Partial<IParseCookieOptions>
) => {
  const cookies = parseCookies(context, options)
  return cookies[nameCookie]
}

export const removeCookie = (
    context: any,
    nameCookie: KEY_COOKIE,
    options?: Partial<IDestroyCookieOptions>
) => {
  const defaultOptions: Partial<IDestroyCookieOptions> = {}
  destroyCookie(context, nameCookie, { ...defaultOptions, ...options })
}

export const saveToCookie = (
    context: any,
    nameCookie: KEY_COOKIE,
    value: any,
    options?: Partial<ISetCookieOptions>
) => {
  const timeExpire = 30 * 24 * 60 * 60
  const defaultOptions: Partial<ISetCookieOptions> = {
    maxAge: timeExpire
  }
  if (!options) {
    options = {}
  }
  setCookie(context, nameCookie, value, { ...defaultOptions, ...options })
}

export const replaceUrlImage = (image_url: string) => {
  if (image_url === undefined || image_url === null) {
    return ''
  }
  let image = image_url
  if (!image_url.includes('http')
      && !image_url.includes(BASE_CONSTANTS.IMAGE_URL)) {
    image = `https://${BASE_CONSTANTS.IMAGE_URL}/${image_url}`
  }
  return image
}

export const isFile = (input: any) => {
  return 'File' in window && input instanceof File
}

export const isBlob = (input: any) => {
  return 'Blob' in window && input instanceof Blob
}

export const formatCurrencyNoUnit = (price: number) => {
  if (price === undefined || price === null) return
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const convertFollowers = (value: number) => {
  if (value / 1000000 > 0) {
    return `${formatCurrencyNoUnit(value / 1000000)}Tr`
  } else if (value / 1000 >= 0) {
    return `${formatCurrencyNoUnit(value / 1000)}K`
  } else return formatCurrencyNoUnit(value / 1000)
}

export const convertDateServer = (value: string) => {
  return moment(value?.toString()).format('HH:MM DD-MM-YYYY')
}