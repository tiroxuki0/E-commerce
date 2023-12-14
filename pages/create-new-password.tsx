import { yupResolver } from "@hookform/resolvers/yup"
import InputBorder from "components/common/input-border"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "stores/auth"
import * as yup from "yup"
import { useLanguage } from "hooks/useLanguage"
import Loading from "components/common/loading"
import { passwordPattern } from "constants/base.constant"
import { useRouter } from "next/router"

const CreateNewPassword = () => {
  const { t } = useLanguage()
  const router = useRouter()
  const schemaLogin = yup.object().shape({
    password: yup.string().required(t.inputPasswordLeftBlank).matches(passwordPattern, t.regexPassword),
    confirmPassword: yup
      .string()
      .required(t.inputPasswordLeftBlank)
      .matches(passwordPattern, t.regexPassword)
      .oneOf([yup.ref("password"), null], t.confirmPasswordNotMatch)
  })

  const [loading, setLoading] = useState(false)
  const [stateAuth, actionAuth] = useAuth()

  const [checkDisabled, setCheckDisabled] = React.useState<boolean>(false)
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors
  } = useForm({ resolver: yupResolver(schemaLogin) })

  React.useEffect(() => {
    !stateAuth.userData.verifyOTP && router.push("/")
  }, [stateAuth.userData])

  const submitLogin = async (data: any) => {
    const { password } = data

    setCheckDisabled(true)
    setLoading(true)

    const result = await actionAuth.resetPasswordAsync({ password, session_id: stateAuth.userData.verifyOTP }, t)

    try {
      if (result?.data?.status) {
        const res = await actionAuth.loginAsync({ username: stateAuth.userData.email, password }, t)
        setLoading(false)
        setCheckDisabled(false)
        try {
          if (res?.status) {
            reset()
            router.push("/")
          }
        } catch (e) {
          // console.error(e);
        }
      }
    } catch (e) {
      // console.error(e);
    }
  }

  return (
    <>
      {stateAuth.userData.verifyOTP && (
        <>
          {loading && <Loading />}
          <div className="h-full flex justify-center items-center p-[25px] w-full max-h-full overflow-y-auto">
            <div className="flex-1 max-w-[510px] flex items-center flex-col justify-end h-full mt-[30px]">
              <p className="text-[28px] md:text-[24px] pt-[20px] text-black-300 font-semibold text-center text-[#1C432C]">{t.createNewPassword}</p>
              <p className="text-[16px] pt-[8px] text-black-300 pb-[1em] text-center opacity-50 w-[70%]">{t.pleaseEnterNewPassword}</p>

              <form className="w-full my-[30px]" onSubmit={handleSubmit(submitLogin)}>
                <div>
                  <InputBorder register={register("password")} name="password" type="password" placeholder={t.enterNewPassword} errors={errors} clearErrors={clearErrors} setValue={setValue} />
                </div>
                <div className="mt-[25px]">
                  <InputBorder
                    register={register("confirmPassword")}
                    name="confirmPassword"
                    type="password"
                    placeholder={t.reEnterPassword}
                    errors={errors}
                    clearErrors={clearErrors}
                    setValue={setValue}
                  />
                </div>

                <input
                  type="submit"
                  disabled={checkDisabled}
                  className="bg-[#346448] shadow-lg text-white w-full py-[15px] mt-[60px] rounded-[5px] font-semibold cursor-pointer outline-none focus:bg-[#346448]"
                  value={t.login}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default CreateNewPassword
