import { BaseAction } from ".."
import { State } from "./index"
import { notifyError, notifySuccess } from "helpers/toast.helper"
import { KEY_COOKIE } from "constants/key-cookie.constant"
import { registerUserService, getUserProfileService, loginService, loginSocialService, forgotPasswordService, verifyMailForgotPasswordService, resetPasswordService } from "services/auth"
import { MESS_REGISTER, MESS_LOGIN, MESS_RESET_PASSWORD } from "constants/message-notification"
import { saveToCookie, saveToLocalStorage, removeFromLocalStorage, removeCookie, getFromLocalStorage } from "helpers/base.helper"
import { IReqLogin, IReqLoginSocial, IReqForgotPassword, IReqRegisterAccount, IReqVerifyForgotPassword, IReqResetPassword } from "services/auth/auth.interface"
import { signOut } from "next-auth/react"

type Actions = BaseAction<State>

export const showModalAuth =
  (type: "login" | "register" | "close") =>
  async ({ setState, getState }: Actions) => {
    if (type === "login") {
      setState({
        ...getState(),
        isRegister: false,
        isModalLogin: !getState().isModalLogin
      })
    } else if (type === "close") {
      setState({
        ...getState(),
        isRegister: false,
        isModalLogin: false
      })
    } else {
      setState({
        ...getState(),
        isRegister: true,
        isModalLogin: !getState().isModalLogin
      })
    }
  }

//USER
export const setUser =
  (payload: { userData: any; isLogin?: boolean; isRegister?: boolean }) =>
  ({ setState, getState }: Actions) => {
    setState({ ...getState(), ...payload })
  }

export const loginAsync =
  (payload: IReqLogin, t: any) =>
  async ({ dispatch, getState }: Actions) => {
    try {
      const result = await loginService(payload)
      if (result.data) {
        saveToLocalStorage("token", result.data.token)
        saveToLocalStorage("isLogin", true)
        saveToCookie(null, KEY_COOKIE.TOKEN, result.data.token, {
          path: "/"
        })

        const res = await getUserProfileService(result?.data?.id)

        if (res.data) {
          saveToLocalStorage("userData", res.data)
          dispatch(
            setUser({
              userData: { verifyOTP: getState().userData?.verifyOTP, ...res.data },
              isLogin: true
            })
          )
          notifySuccess(t[MESS_LOGIN.LOGIN_SUCCESS] as any)
        }
      } else {
        notifyError(result.message as any)
      }
      return result
    } catch (error: any) {
      const result = error.response.data
      /* if (result.error) {
      if (result.code) {
        notifyError(ERROR_CODE_VALUE[result.code][useLocales()]);
        return;
      }
      if (result.message == MESS_ERROR_SERVER.EMAIL_EXIST)
        return notifyError((MESS_REGISTER.EMAIL_EXIST as any)[useLocales()]);
      else if (result.message === MESS_ERROR_SERVER.PHONE_EXIST)
        return notifyError(
          (MESS_REGISTER.INVALID_PHONE as any)[useLocales()]
        );
      return notifyError((MESS_REGISTER.ERROR_SERVER as any)[useLocales()]);
    } */
      return result
    }
  }

export const loginSocialAsync =
  (payload: IReqLoginSocial, t: any) =>
  async ({ dispatch }: Actions) => {
    try {
      const result = await loginSocialService(payload)
      if (result.data) {
        saveToLocalStorage("token", result.data.token)
        saveToLocalStorage("isLogin", true)
        saveToCookie(null, KEY_COOKIE.TOKEN, result.data.token, {
          path: "/"
        })

        const res = await getUserProfileService(result?.data?.id)

        if (res.data) {
          saveToLocalStorage("userData", res.data)
          dispatch(
            setUser({
              userData: res.data,
              isLogin: true
            })
          )
          return notifySuccess(t[MESS_LOGIN.LOGIN_SUCCESS] as any)
        }
      } else {
        return notifyError(result.message as any)
      }
    } catch (error: any) {
      const result = error.response.data
      /* if (result.error) {
      if (result.code) {
        notifyError(ERROR_CODE_VALUE[result.code][useLocales()]);
        return;
      }
      if (result.message == MESS_ERROR_SERVER.EMAIL_EXIST)
        return notifyError((MESS_REGISTER.EMAIL_EXIST as any)[useLocales()]);
      else if (result.message === MESS_ERROR_SERVER.PHONE_EXIST)
        return notifyError(
          (MESS_REGISTER.INVALID_PHONE as any)[useLocales()]
        );
      return notifyError((MESS_REGISTER.ERROR_SERVER as any)[useLocales()]);
    } */
      return result
    }
  }

export const registerUserAsync =
  (payload: IReqRegisterAccount, t: any) =>
  async ({ dispatch }: Actions) => {
    try {
      const result = await registerUserService(payload)
      if (result.data) {
        saveToLocalStorage("token", result.data.token)
        saveToCookie(null, KEY_COOKIE.TOKEN, result.data.token, {
          path: "/"
        })

        const res = await getUserProfileService(result?.data?.id)

        if (res.data) {
          dispatch(
            setUser({
              userData: res.data,
              isLogin: true
            })
          )
        }
      } else {
        if (result.message?.toUpperCase()?.includes("EMAIL")) return notifyError(t[MESS_REGISTER.EMAIL_EXIST] as any)
      }
      return result
    } catch (error: any) {
      const result = error.response.data
      /* if (result.error) {
        if (result.code) {
          notifyError(ERROR_CODE_VALUE[result.code][useLocales()]);
          return;
        }
        if (result.message == MESS_ERROR_SERVER.EMAIL_EXIST)
          return notifyError((MESS_REGISTER.EMAIL_EXIST as any)[useLocales()]);
        else if (result.message === MESS_ERROR_SERVER.PHONE_EXIST)
          return notifyError(
            (MESS_REGISTER.INVALID_PHONE as any)[useLocales()]
          );
        return notifyError((MESS_REGISTER.ERROR_SERVER as any)[useLocales()]);
      } */
      return result
    }
  }

export const getUserProfileAsync =
  (payload: any, t: any) =>
  async ({ dispatch }: Actions) => {
    try {
      const result = await getUserProfileService(payload.id)
      if (result.data) {
        dispatch(
          setUser({
            userData: result.data,
            isLogin: false
          })
        )
      }
      return result
    } catch (error: any) {
      const result = error.response.data
      return result
    }
  }

export const logoutAsync =
  (t: any): any =>
  async ({ setState, getState }: Actions) => {
    const isSocial = getFromLocalStorage("social")
    removeFromLocalStorage("breadCrumb")
    removeFromLocalStorage("token")
    removeFromLocalStorage("userData")
    removeCookie(null, KEY_COOKIE.TOKEN, { path: "/" })
    removeCookie(null, KEY_COOKIE.REFRESH_TOKEN, { path: "/" })
    setState({
      ...getState(),
      isRegister: false,
      isLogin: false,
      isModalLogin: false,
      userData: {}
    })
    notifySuccess(t[MESS_LOGIN.LOGOUT_SUCCESS])
    if (isSocial) {
      signOut()
    }

    return true
  }

export const forgotPasswordAsync =
  (payload: IReqForgotPassword, t: any) =>
  async ({ setState, getState }: Actions) => {
    try {
      const result = await forgotPasswordService(payload)
      if (result?.data?.status) {
        setState({
          ...getState(),
          userData: { ...getState().userData, email: payload.email }
        })
        notifySuccess(t[MESS_RESET_PASSWORD.CHECK_MAIL])
      } else {
        notifyError(t[MESS_RESET_PASSWORD.EMAIL_NOT_FOUND])
      }
      return result
    } catch (error: any) {
      const result = error.response.data
      return result
    }
  }

export const resetPasswordAsync = (payload: IReqResetPassword, t: any) => async () => {
  try {
    const result = await resetPasswordService(payload)
    if (!result?.data?.status) {
      notifyError(t[MESS_RESET_PASSWORD.EMAIL_NOT_FOUND])
    }
    return result
  } catch (error: any) {
    const result = error.response.data
    return result
  }
}

export const verifyMailForgotPasswordAsync =
  (payload: IReqVerifyForgotPassword, t: any) =>
  async ({ setState, getState }: Actions) => {
    try {
      const result = await verifyMailForgotPasswordService(payload)
      if (result?.status && !result?.data) {
        setState({
          ...getState(),
          userData: { ...getState().userData, verifyOTP: payload.code }
        })
        notifySuccess(t[MESS_RESET_PASSWORD.VERIFY_SUCCESS])
      } else {
        notifyError(t[MESS_RESET_PASSWORD.OTP_USED])
      }
      return result
    } catch (error: any) {
      const result = error.response.data
      return result
    }
  }
