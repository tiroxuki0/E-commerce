import React from "react"
import {useLanguage} from "hooks/useLanguage"
import Image from "next/image"

interface Props {
  title: string
  imageUrl?: string
}

const NoData = ({title, imageUrl}: Props) => {
  const {t} = useLanguage()

  return (
    <div className="text-center">
      {
        imageUrl &&
          <div className="relative lg:w-[500px] w-[250px] lg:h-[400px] h-[200px] mb-[5px] mx-auto">
            <Image src={imageUrl}
                   layout="fill"
                   objectFit="contain"
                   alt={imageUrl}/>
          </div>
      }
      <p className="text-primary text-center text-[16px]">{title ? t[title] : ""}</p>
    </div>
  )
}

export default NoData
