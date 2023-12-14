import React from "react"
import {useLanguage} from "hooks/useLanguage"

const RegisterMail = () => {
  const {t} = useLanguage()

  return (
    <section className="bg-[#346448] py-[36px] lg:block hidden">
      <div className="w-[90%] mx-[auto] flex items-center justify-between md:flex-row flex-col gap-5 md:gap-0">
        <div className="text-white max-w-[340px] w-full md:text-left text-center"
             dangerouslySetInnerHTML={{__html: t.registerMail}}
        />
        <form action="" method="post" className="flex items-center justify-end w-full">
          <input
            type="email"
            name="yourMail"
            className="outline-none bg-transparent text-white border border-white py-[15px] px-[29px] rounded-[5px] max-w-[564px] w-full placeholder-white text-[14px] mr-[12px] font-semibold"
            placeholder={t.pleaseEnterYourEmailAddress}
          />
          <button className="max-w-[120px] w-full px-[27px] py-[15px] text-[#346448] bg-white rounded-[5px] font-semibold">{t.register}</button>
        </form>
      </div>
    </section>
  )
}

export default RegisterMail
