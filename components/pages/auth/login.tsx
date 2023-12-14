import { yupResolver } from "@hookform/resolvers/yup"
import InputBorder from "components/common/input-border"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "stores/auth"
import * as yup from "yup"
import { useLanguage } from "hooks/useLanguage"
import Loading from "components/common/loading"
import Logo from "./logo"
import { passwordPattern } from "constants/base.constant"
import { useRouter } from "next/router"

const Login = (props: { setLoginForm: any; handleCloseModal(): void }) => {
  const router = useRouter()
  const { t } = useLanguage()
  const schemaLogin = yup.object().shape({
    email: yup.string().email(t.emailInvalid).required(t.emailNotLeftBlank),
    password: yup.string().required(t.inputPasswordLeftBlank).matches(passwordPattern, t.regexPassword)
  })

  const [loading, setLoading] = useState(false)
  const [, actionAuth] = useAuth()

  const [checkDisabled, setCheckDisabled] = React.useState<boolean>(false)
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors
  } = useForm({ resolver: yupResolver(schemaLogin) })

  const submitLogin = async (data: any) => {
    const { email, password } = data

    setCheckDisabled(true)
    setLoading(true)

    const result = await actionAuth.loginAsync({ username: email, password }, t)
    setLoading(false)
    setCheckDisabled(false)

    try {
      if (result?.status) {
        reset()
      }
    } catch (e) {
      // console.error(e);
    }
  }

  return (
    <React.Fragment>
      {loading && <Loading />}
      <div className="h-full flex justify-center p-[25px] relative md:w-full max-h-full overflow-y-auto">
        <div className="absolute top-[15px] right-[15px] cursor-pointer text-lg font-bold" onClick={props?.handleCloseModal}>
          <img src="/images/icons/ic-close.svg" alt="/images/icons/ic-close.svg" className="cursor-pointer w-[24px] h-[24px]" />
        </div>
        <div className="w-full grid grid-cols-1 gap-[47px] justify-between">
          <div className="flex items-center flex-col justify-end h-auto lg:h-full">
            <div className="flex lg:items-center justify-center flex-shrink-0 pt-0">
              <Logo />
            </div>

            <div className="flex-1 w-full flex items-center flex-col justify-start lg:h-full">
              <p className="text-[28px] md:text-[24px] pt-[20px] text-black-300 font-semibold text-center text-[#1C432C]">{t.login}</p>
              <form className="w-full mt-[30px] md:mt-[10px]" onSubmit={handleSubmit(submitLogin)}>
                <div>
                  <InputBorder register={register("email")} name="email" type="text" placeholder={t.emailOrPhoneNumber} errors={errors} clearErrors={clearErrors} setValue={setValue} />
                </div>
                <div className="mt-[25px]">
                  <InputBorder register={register("password")} name="password" type="password" placeholder={t.password} errors={errors} clearErrors={clearErrors} setValue={setValue} />
                </div>
                <div
                  className="text-right mt-[12px] cursor-pointer"
                  onClick={() => {
                    props.handleCloseModal()
                    router.push("/forgot-password")
                  }}
                >
                  {t.forgotPassword}?
                </div>

                <input type="submit" disabled={checkDisabled} className="bg-[#346448] shadow-lg text-white w-full py-[15px] mt-[18px] rounded-[5px] font-semibold cursor-pointer" value={t.login} />
              </form>

              <p className="text-16px mt-[10px] mb-[20px] font-normal text-center">
                {t.dontHaveAnAccount}?
                <span
                  onClick={() => {
                    props.setLoginForm(false)
                  }}
                  className="mx-[5px] font-semibold cursor-pointer underline"
                >
                  {t.register}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login
