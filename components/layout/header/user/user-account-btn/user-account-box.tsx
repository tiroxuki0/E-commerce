import Link from "next/link"
import React from "react"
import { useAuth } from "stores/auth"
import { useLanguage } from "hooks/useLanguage"
import { AiOutlineUser } from "react-icons/ai"
import { IoLogOutOutline } from "react-icons/io5"

interface Props {
  onClose: () => void
}
const UserAccountBox: React.FC<Props> = ({ onClose }) => {
  const { t } = useLanguage()
  const [, actionAuth] = useAuth()
  
  function onLogoutClickHandler() {
    actionAuth.logoutAsync(t)
    onClose()
  }
  
  return (
    <div>
      <ul>
        <li className="my-1 py-1" onClick={onClose}>
          <Link href={"/"}>
            <a className="flex items-center hover:text-palette-primary">
              <AiOutlineUser
                style={{
                  fontSize: "1.2rem",
                  width: "1.8rem"
                }}
              />
              <span className="font-normal rtl:mr-1 ltr:ml-1">{t.userInfo}</span>
            </a>
          </Link>
        </li>
        <li className="my-1 py-1" onClick={onLogoutClickHandler}>
          <Link href={`/`}>
            <a className="flex items-center hover:text-palette-primary">
              <IoLogOutOutline
                style={{
                  fontSize: "1.5rem",
                  width: "1.8rem"
                }}
              />
              <span className="font-normal rtl:mr-1 ltr:ml-1">{t.logout}</span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default UserAccountBox
