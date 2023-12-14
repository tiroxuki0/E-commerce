import React from "react"
import { useLanguage } from "hooks/useLanguage"
import { useAuth } from "stores/auth"
import { HiOutlineLogin } from "react-icons/hi"

const LoginBtn = () => {
  const { t } = useLanguage()
  const [, actionAuth] = useAuth()

  return (
    <a aria-label="User actions">
      <div className="items-center rounded-lg">
        <div className="md:hidden mr-[10px] flex align-center">
          <HiOutlineLogin style={{ color: "#254a34", transform: "translate(2px,-1px)" }} size={25} />
        </div>
        <div className="hidden md:flex items-center gap-2">
          <p className="text-[15px] lg:text-[16px] cursor-pointer" onClick={() => actionAuth.showModalAuth("register")}>
            {t.register}
          </p>
          |
          <p className="text-[15px] lg:text-[16px] cursor-pointer" onClick={() => actionAuth.showModalAuth("login")}>
            {t.login}
          </p>
        </div>
      </div>
    </a>
  )
}

export default LoginBtn
