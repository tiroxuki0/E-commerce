import React from "react"
import UserAccountBtn from "components/layout/header/user/user-account-btn"
import LoginBtn from "./login-btn"
import { getFromLocalStorage } from "helpers/base.helper"
import { useAuth } from "stores/auth"

const User = () => {
  const isLogin = getFromLocalStorage("isLogin")
  const userData = getFromLocalStorage("userData")
  const [, actionAuth] = useAuth()

  React.useEffect(() => {
    userData?.id && actionAuth.setUser({ userData, isLogin: true })
  }, [])

  return <div>{isLogin && userData?.id ? <UserAccountBtn /> : <LoginBtn />}</div>
}

export default User
