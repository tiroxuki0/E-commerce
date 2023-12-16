import React, { memo } from "react"
import Image from "next/image"
// import Link from "next/link"
// import { useRouter } from "next/router"

const Card = ({ data }: { data: any }) => {
  return (
    <div className="card-item Frame5272 w-full md:h-auto flex-col justify-start items-start inline-flex  rounded-[8px] bg-white cursor-pointer">
      <div className="Group1000000797 w-full h-auto relative">
        <div className="Image w-full h-auto mx-auto flex items-center justify-center p-2">
          <Image objectFit="contain" alt="media" width={159} height={80} className="Image mx-auto" src={data?.imageURL} />
        </div>
        <div className="p-[10px]">
          <div className="UpyoDomainProMembe w-full h-6 text-slate-950 text-xs font-bold tracking-wide text-truncate-1 text-center">{data?.title}</div>
        </div>
      </div>
    </div>
  )
}

export default memo(Card)
