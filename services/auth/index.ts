import { ReturnResponse } from 'configs/api/response.interface'
import API from 'configs/api/repository-api'
import {
  IReqLoginSocial,
  IReqLogin,
  IReqRegisterAccount,
  IReqForgotPassword,
  IReqResetPassword,
  IReqVerifyForgotPassword
} from './auth.interface'

export const registerUserService = (
  payload: IReqRegisterAccount
): Promise<ReturnResponse<any>> => {
  return API.post(`/auth/customer/register`, {
    body: { ...payload }
  }) as any
}

export const getUserProfileService = (
  id: any
): Promise<ReturnResponse<any>> => {
  return API.get(`/customer/${id}`) as any
}

export const loginService = (
  payload: IReqLogin
): Promise<ReturnResponse<any>> => {
  return API.post(`/auth/customer/login`, {
    body: { ...payload }
  }) as any
}

export const loginSocialService = (
  payload: IReqLoginSocial
): Promise<ReturnResponse<any>> => {
  return API.post(`/auth/customer/social/verify-token`, {
    body: { ...payload }
  }) as any
}

export const forgotPasswordService = (
  payload: IReqForgotPassword
): Promise<ReturnResponse<any>> => {
  return API.post(`/auth/customer/forgot`, {
    body: { ...payload }
  }) as any
}

export const resetPasswordService = (
  payload: IReqResetPassword
): Promise<ReturnResponse<any>> => {
  return API.put(`/auth/customer/reset`, {
    body: { ...payload }
  }) as any
}

export const verifyMailForgotPasswordService = (
  payload: IReqVerifyForgotPassword
) => {
  return API.post(`/auth/customer/verify-otp`, {
    body: { ...payload }
  }) as any
}