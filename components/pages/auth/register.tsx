import { yupResolver } from "@hookform/resolvers/yup"
import InputBorder from "components/common/input-border"
import { notifySuccess } from "helpers/toast.helper"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "stores/auth"
import * as yup from "yup"
import { useLanguage } from "hooks/useLanguage"
import Loading from "components/common/loading"
import Logo from "./logo"
import { passwordPattern, fullNamePattern } from "constants/base.constant"

const Register = (props: { setLoginForm: any; handleCloseModal(): void }) => {
  const { t } = useLanguage()
  const schemaRegister = yup.object().shape({
    fullName: yup.string().required(t.inputUsernameLeftBlank).matches(fullNamePattern, t.regexFullName),
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
  } = useForm({ resolver: yupResolver(schemaRegister) })

  const submitRegister = async (data: any) => {
    const { fullName, email, password } = data

    setCheckDisabled(true)
    setLoading(true)

    const result = await actionAuth.registerUserAsync({ fullName: fullName, email: email, password }, t)
    setLoading(false)
    setCheckDisabled(false)

    try {
      if (result?.status) {
        notifySuccess(t.successfullyRegister)
        reset()
        props?.handleCloseModal()
      }
    } catch (e) {
      // console.error(e);
    }
  }

  return (
    <React.Fragment>
      {loading && <Loading />}
      <div className="h-full flex justify-center lg:items-center p-[25px] relative md:w-full max-h-full overflow-y-auto">
        <div className="absolute top-[15px] right-[15px] cursor-pointer text-lg font-bold" onClick={props?.handleCloseModal}>
          <img src="/images/icons/ic-close.svg" alt="/images/icons/ic-close.svg" className="cursor-pointer w-[24px] h-[24px]" />
        </div>
        <div className="w-full grid grid-cols-1 gap-[47px] items-center justify-between">
          <div className="flex items-center flex-col justify-end h-full">
            <div className="relative flex items-center justify-center flex-shrink-0 pt-[0px]">
              <Logo />
            </div>

            <div className="flex-1 w-full flex items-center flex-col justify-end h-full">
              <p className="text-[28px] md:text-[24px] pt-[20px] text-black-300 font-semibold text-center text-[#1C432C]">{t.registerAccount}</p>
              <form className="w-full mt-[30px] md:mt-[10px]" onSubmit={handleSubmit(submitRegister)}>
                <div>
                  <InputBorder register={register("fullName")} name="fullName" type="text" placeholder={t.fullName} errors={errors} clearErrors={clearErrors} setValue={setValue} />
                </div>
                <div className="mt-[25px]">
                  <InputBorder register={register("email")} name="email" type="text" placeholder="Email" errors={errors} clearErrors={clearErrors} setValue={setValue} />
                </div>
                <div className="mt-[25px]">
                  <InputBorder register={register("password")} name="password" type="password" placeholder={t.password} errors={errors} clearErrors={clearErrors} setValue={setValue} />
                </div>

                <input type="submit" disabled={checkDisabled} className="bg-[#346448] shadow-lg text-white w-full py-[15px] mt-[18px] rounded-[5px] font-semibold cursor-pointer" value={t.register} />
              </form>

              <p className="text-16px mt-[10px] mb-[20px] font-normal text-center">
                {t.alreadyHaveAccount}?
                <span
                  onClick={() => {
                    props.setLoginForm(true)
                  }}
                  className="mx-[5px] font-semibold cursor-pointer underline"
                >
                  {t.login}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Register
