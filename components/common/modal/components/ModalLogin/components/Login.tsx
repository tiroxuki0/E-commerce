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
  const [loginForm, setLoginForm] = useState(true)
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      removeFromLocalStorage('social')
      removeFromLocalStorage('isLogin')
      removeFromLocalStorage('userData')
    }
  })
  const [, actionAuth] = useAuth()

  useEffect(() => {
    const isLogin = getFromLocalStorage('isLogin')
    
    if (status === "authenticated" && !isLogin) {
      let capitalizedStr = session["provider"].charAt(0).toUpperCase() + session["provider"].slice(1)
      saveToLocalStorage("social", capitalizedStr)
      actionAuth.loginSocialAsync({ type: capitalizedStr, code: session["accessToken"] }, t)
      props?.handleCloseModal()
    }
  }, [session])

  const popupCenter = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX
    const dualScreenTop = window.screenTop ?? window.screenY
    const width = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width

    const height = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height

    const systemZoom = width / window.screen.availWidth

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft
    const top = (height - 550) / 2 / systemZoom + dualScreenTop

    const newWindow = window.open(url, title, `width=${500 / systemZoom},height=${550 / systemZoom},top=${top},left=${left}`)

    newWindow?.focus()
  }

  return (
    <React.Fragment>
      {props?.status && <Head>{loginForm ? <title>{t.login}</title> : <title>{t.register}</title>}</Head>}
      <main className="w-full md:w-[50vw] h-[100vh] md:max-h-[70vh] max-h-[100vh] md:h-[70vh] overflow-hidden bg-white">
        {loginForm ? (
          <LoginUI setLoginForm={setLoginForm} handleCloseModal={props?.handleCloseModal} popupCenter={popupCenter} />
        ) : (
          <RegisterUI setLoginForm={setLoginForm} handleCloseModal={props?.handleCloseModal} popupCenter={popupCenter} />
        )}
      </main>
    </React.Fragment>
  )
}

export default Login
