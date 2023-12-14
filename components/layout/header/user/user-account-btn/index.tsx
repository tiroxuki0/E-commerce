import React, { useRef, useState } from "react"
import { AiOutlineUser } from "react-icons/ai"
import { HiChevronDown } from "react-icons/hi"
import { Transition } from "react-transition-group"
import UserAccountBox from "./user-account-box"

const UserAccountBtn = () => {
  const [isUserBoxOpen, setIsUserBoxOpen] = useState(false)
  const nodeRef = useRef<HTMLDivElement>(null)

  function onClose() {
    setIsUserBoxOpen((prev) => prev && false)
  }

  function onIconClickHandler() {
    setIsUserBoxOpen((prev) => !prev)
  }

  return (
    <div className="relative z-[100]">
      <div className="flex items-center cursor-pointer" onClick={onIconClickHandler}>
        <AiOutlineUser style={{ fontSize: "1.5rem" }} />
        <HiChevronDown />
      </div>
      <Transition nodeRef={nodeRef} in={isUserBoxOpen} timeout={300} mountOnEnter unmountOnExit>
        {(state) => {
          return (
            <>
              <div className="fixed inset-0" onClick={onClose}></div>
              <div ref={nodeRef} className="z-[100] absolute top-full ltr:right-0 rtl:left-0 w-[13rem] p-4 bg-palette-card rounded-lg shadow-lg">
                <UserAccountBox onClose={onClose} />
              </div>
            </>
          )
        }}
      </Transition>
    </div>
  )
}

export default UserAccountBtn
