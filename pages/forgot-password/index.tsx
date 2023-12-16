import { yupResolver } from "@hookform/resolvers/yup"
import InputBorder from "components/common/input-border"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "stores/auth"
import * as yup from "yup"
import { useLanguage } from "hooks/useLanguage"
import Loading from "components/common/loading-new"
import { useRouter } from "next/router"

const ForgotPassword = () => {
  const router = useRouter()
  const { t } = useLanguage()
  const schemaForgotPassword = yup.object().shape({
    email: yup.string().email(t.emailInvalid).required(t.emailNotLeftBlank),
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
  } = useForm({ resolver: yupResolver(schemaForgotPassword) })

  const submitForgotPassword = async (data: any) => {
    const { email } = data
    
    setCheckDisabled(true)
    setLoading(true)

    const result = await actionAuth.forgotPasswordAsync({ email }, t)
    setLoading(false)
    setCheckDisabled(false)

    try {
      if (result?.data?.status) {
        reset()
        router.push('/forgot-password/verify-email')
      }
    } catch (e) {
      // console.error(e);
    }
  }

  return (
    <React.Fragment>
      {loading && <Loading />}
      <div className="h-full flex justify-center items-center p-[25px] w-full max-h-full overflow-y-auto">
        <div className="flex-1 max-w-[510px] flex items-center flex-col justify-end h-full mt-[30px]">
          <p className="text-[28px] md:text-[24px] pt-[20px] text-black-300 font-semibold text-center text-[#1C432C]">{t.resetPassword}</p>
          <p className="text-[16px] pt-[8px] text-black-300 pb-[1em] text-center opacity-50 w-[70%]">{t.weSendMail}</p>

          <form className="w-full my-[30px]" onSubmit={handleSubmit(submitForgotPassword)}>
            <div>
              <InputBorder register={register("email")} name="email" type="text" placeholder={t.email} errors={errors} clearErrors={clearErrors} setValue={setValue} />
            </div>

            <input type="submit" disabled={checkDisabled} className="bg-[#346448] shadow-lg text-white w-full py-[15px] mt-[60px] rounded-[5px] font-semibold cursor-pointer outline-none focus:bg-[#346448] outline-none focus:bg-[#346448]" value={t.sendMail} />
            <input
              type="button"
              className="bg-white shadow-lg text-[#346448] w-full py-[15px] mt-[10px] rounded-[5px] border-[2px] border-solid border-[#346448] font-semibold cursor-pointer outline-none"
              value={t.cancel}
            />
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ForgotPassword
