export interface IReqRegisterAccount {
  password: string
  fullName: string
  email: string
}

export interface IReqLogin {
  username: string
  password: string
}
export interface IReqLoginSocial {
  type: string
  code: string
  referral?: string
}

export interface IReqForgotPassword {
  email: string
  phone?: string
  otp?: string
}

export interface IReqVerifyForgotPassword {
  code: string
  email: string
}

export interface IReqResetPassword {
  password: string
  session_id: string
}