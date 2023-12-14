import React, { useRef, useState } from "react"
import { AiOutlineUser } from "react-icons/ai"
import { HiChevronDown } from "react-icons/hi"
import { FaWallet } from "react-icons/fa"
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
    <div className="relative z-[100] flex items-center gap-2">
      <div className="flex items-center gap-1">
        <FaWallet />
        <div className="flex items-center gap-1">
          <span>Số dư:</span>
          <span className="font-bold">0 đ</span>
        </div>
      </div>
      <div className="flex items-center cursor-pointer mr-[5px]" onClick={onIconClickHandler}>
        <AiOutlineUser style={{ fontSize: "1.5rem" }} />
        Tấn Hải
        <HiChevronDown />
      </div>
      <Transition nodeRef={nodeRef} in={isUserBoxOpen} timeout={300} mountOnEnter unmountOnExit>
        {(state) => {
          return (
            <>
              <div className="fixed inset-0" onClick={onClose}></div>
              <div ref={nodeRef} className="z-[100] absolute top-full right-0 w-[13rem] p-4 bg-white rounded-lg shadow-lg">
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
