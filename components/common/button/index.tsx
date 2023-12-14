import React from "react"
import { useRouter } from "next/router"

interface Props {
  title: string
  linkUrl: string
  onClick?: () => void
  className?: string
}

const ButtonCustom = (props: Props) => {
  const router = useRouter()

  const handleSubmit = () => {
    if (props.onClick) {
      props.onClick()
    } else {
      if (!props.linkUrl) return
      router.push(props.linkUrl)
    }
  }

  return (
    <button className={`btn capitalize text-primary rounded-common ${props.className || ''}`}
            onClick={handleSubmit}
    >
      {props.title || ''}
    </button>
  )
}

export default ButtonCustom
