import { showModalAuth, registerUserAsync, loginAsync, loginSocialAsync, logoutAsync, setUser, forgotPasswordAsync, verifyMailForgotPasswordAsync, resetPasswordAsync } from "./auth.action"
import { createHook, createStore } from "react-sweet-state"
import { selector } from "./auth.selector"
import { USER_MODEL } from "models/user.model"

export type State = {
  userData: USER_MODEL
  isModalLogin: boolean
  isLogin: boolean
  isRegister: boolean
}

const initialState: State = {
  userData: {
    avatar: undefined,
    avatar_thumb: undefined,
    coin: undefined,
    createdAt: undefined,
    customer_addresses: [],
    customer_like_products: [],
    customer_seen_products: [],
    delete_flag: undefined,
    deletedAt: undefined,
    dob: undefined,
    email: "",
    fbId: undefined,
    gender: undefined,
    googleId: undefined,
    id: undefined,
    is_auth: undefined,
    is_payment: undefined,
    name: undefined,
    note: undefined,
    phone: undefined,
    referral_code: undefined,
    refresh_token: undefined,
    sapo_customer_id: undefined,
    status: undefined,
    updatedAt: undefined,
    username: undefined,
    verifyOTP: ""
  },
  isModalLogin: false,
  isLogin: false,
  isRegister: false
}

const actions = {
  showModalAuth,
  registerUserAsync,
  logoutAsync,
  loginAsync,
  loginSocialAsync,
  forgotPasswordAsync,
  verifyMailForgotPasswordAsync,
  resetPasswordAsync,
  setUser
}

const Store = createStore({
  initialState,
  actions
})

export const useAuth = createHook(Store, { selector: selector })
