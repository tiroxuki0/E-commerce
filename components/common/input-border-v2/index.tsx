import React from "react"
import ErrorText from "components/common/error-text"
import { FiCopy } from "react-icons/fi"

type Props = {
  name: string
  errors?: any
  autofill?: boolean
  placeholder?: string
  type?: "text" | "number"
  classNameInput?: string
  clearErrors?: (item: string) => void
  setValue?: (key: string, value: unknown) => void
  onKeyPress?: (key: any) => void
}

const InputBorderV2 = ({
  name,
  type = "text",
  errors = {},
  placeholder = "",
  classNameInput = "",
  autofill = true,
  clearErrors = () => {
    return
  },
  setValue = () => {
    return
  }
}: Props) => {
  const onChange = (e: any) => {
    const value = e.target.value
    clearErrors(name)
    setValue(name, value)
  }

  return (
    <>
      <div className="relative">
        <input
          type={type}
          style={{ paddingRight: "37px !important" }}
          className={`input-border input-border-v2 ${classNameInput} ${errors[name] ? "error" : ""}`}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={autofill ? "on" : "new-password"}
        />
        <div className="absolute top-[50%] transform translate-y-[-50%] right-[5px] flex items-center px-2 text-gray-700 cursor-pointer">
          <FiCopy size={20} />
        </div>
      </div>
      {errors[name] && <ErrorText>{errors[name].message}</ErrorText>}
    </>
  )
}

export default InputBorderV2
