import React from "react"
import { CARD_OPTIONS } from "constants/base.constant"
import { useRouter } from "next/router"

interface Props {
  onClose: () => void
}

type ItemType = { label: string; value: string }

const Box: React.FC<Props> = ({ onClose }) => {
  const router = useRouter()
  const filter = router.query.filter

  const handleFilter = (item: ItemType) => {
    onClose()
    router.push({
      pathname: "/",
      query: { ...router.query, card: item.value }
    })
  }
  
  return (
      <ul>
        {CARD_OPTIONS.map((item: ItemType, index: number) => {
          return (
              <li className="cursor-pointer" key={index} onClick={() => handleFilter(item)}>
                <a className="flex items-center p-[10px] hover:bg-item">
                <span
                    className={`text-[14px] ${filter === undefined ? (item.value === CARD_OPTIONS[0].value ? "font-[500]" : "font-normal") : filter === item.value ? "font-bold" : "font-normal"}`}
                >
                  {item.label}
                </span>
                </a>
              </li>
          )
        })}
      </ul>
  )
}

export default Box
