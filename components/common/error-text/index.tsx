import React from "react"

interface ErrorTextProps {
  children: React.ReactNode
  classNameError?: string
}

const ErrorText = (props: ErrorTextProps) => {
  const { children, classNameError } = props
  return (
    <div className="flex items-center gap-x-[10px] pt-[2px]">
      <p
        className={`text-[13px] font-normal text-[#f43f23] ${classNameError} `}
      >
        {children}
      </p>
    </div>
  )
}

export default ErrorText
