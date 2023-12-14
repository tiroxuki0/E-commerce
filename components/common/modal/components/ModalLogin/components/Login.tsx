import Head from "next/head"
import React, { useEffect, useState } from "react"
import { useAuth } from "stores/auth"
import { useSession } from "next-auth/react"
import LoginUI from "components/pages/auth/login"
import RegisterUI from "components/pages/auth/register"
import { useLanguage } from "hooks/useLanguage"
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from "helpers/base.helper"

const Login = (props: { status: boolean; handleCloseModal(): void }) => {
  const { t } = useLanguage()
  const [stateAuth, actionAuth] = useAuth()
  
  const [loginForm, setLoginForm] = useState(true)
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      removeFromLocalStorage("social")
      removeFromLocalStorage("isLogin")
      removeFromLocalStorage("userData")
    }
  })

  useEffect(() => {
    const isLogin = getFromLocalStorage("isLogin")

    if (status === "authenticated" && !isLogin) {
      let capitalizedStr = session["provider"].charAt(0).toUpperCase() + session["provider"].slice(1)
      saveToLocalStorage("social", capitalizedStr)
      actionAuth.loginSocialAsync({ type: capitalizedStr, code: session["accessToken"] }, t)
      props?.handleCloseModal()
    }
  }, [session])

  useEffect(() => {
    setLoginForm(!stateAuth.isRegister)
  }, [stateAuth.isRegister])

  return (
    <React.Fragment>
      {props?.status && <Head>{loginForm ? <title>{t.login}</title> : <title>{t.register}</title>}</Head>}
      <main className="w-full md:w-[40vw] h-[100vh] md:max-h-[90vh] max-h-[100vh] md:h-[90vh] overflow-hidden bg-white">
        {loginForm ? <LoginUI setLoginForm={setLoginForm} handleCloseModal={props?.handleCloseModal} /> : <RegisterUI setLoginForm={setLoginForm} handleCloseModal={props?.handleCloseModal} />}
      </main>
    </React.Fragment>
  )
}

export default Login
