import React from "react"
import { useLanguage } from "hooks/useLanguage"
import { useAuth } from "stores/auth"
import { HiOutlineLogin } from "react-icons/hi"

const LoginBtn = () => {
  const { t } = useLanguage()
  const [, actionAuth] = useAuth()

  return (
    <a aria-label="User actions" onClick={() => actionAuth.showModalAuth("login")}>
      <div className="items-center rounded-lg">
        <div className="md:hidden">
          <HiOutlineLogin style={{ color: "#254a34", transform: "translate(2px,-1px)" }} size={30} />
        </div>
        <p className="hidden md:block text-[15px] lg:text-[16px]">{t.loginAndSignIn}</p>
      </div>
    </a>
  )
}

export default LoginBtn
