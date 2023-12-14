import React, { useState } from "react"
import { useAuth } from "stores/auth"
import * as yup from "yup"
import { useLanguage } from "hooks/useLanguage"
import Loading from "components/common/loading"
import { OTP_LENGTH } from "constants/base.constant"
import OtpInput from "react-otp-input"
import styled from "styled-components"
import { useRouter } from "next/router"

const OtpWrapper = styled.div`
  .otp-input {
    width: 45px !important;
  }
`

const VerifyEmail = () => {
  const router = useRouter()
  const [otp, setOTP] = useState("")
  const { t } = useLanguage()

  const [loading, setLoading] = useState(false)
  const [stateAuth, actionAuth] = useAuth()

  const [checkDisabled, setCheckDisabled] = React.useState<boolean>(false)

  React.useEffect(() => {
    !stateAuth.userData.email && router.push("/")
  }, [])

  const submitVerify = async () => {
    if (!otp || otp.length < OTP_LENGTH) {
      return
    }
    setCheckDisabled(true)
    setLoading(true)

    const result = await actionAuth.verifyMailForgotPasswordAsync({ email: stateAuth.userData.email, code: otp }, t)
    setLoading(false)
    setCheckDisabled(false)

    try {
      if (result?.status && !result?.data) {
        router.push("/create-new-password")
      }
    } catch (e) {
      // console.error(e);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className="h-full flex justify-center items-center p-[25px] w-full max-h-full overflow-y-auto">
        <div className="flex-1 max-w-[510px] flex items-center flex-col justify-end h-full mt-[30px]">
          <p className="text-[28px] md:text-[24px] pt-[20px] text-black-300 font-semibold text-center text-[#1C432C]">{t.enterCodeToCreatePassword}</p>
          <p className="text-[16px] pt-[8px] text-black-300 pb-[1em] text-center opacity-50 w-[70%]">{t.weSendMail}</p>

          <form className="w-full my-[30px]">
            <OtpWrapper>
              <OtpInput
                containerStyle="w-full flex items-center justify-center gap-[15px]"
                inputStyle="otp-input w-[45px] h-[45px] rounded-[5px] border-[2px] border-solid border-[#346448] !important"
                value={otp}
                onChange={setOTP}
                numInputs={OTP_LENGTH}
                renderSeparator={""}
                renderInput={(props) => <input {...props} />}
              />
            </OtpWrapper>

            <input
              type="button"
              disabled={checkDisabled}
              className="bg-[#346448] shadow-lg text-white w-full py-[15px] mt-[60px] rounded-[5px] font-semibold cursor-pointer outline-none focus:bg-[#346448]"
              value={t.begin}
              onClick={submitVerify}
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default VerifyEmail
