import React from "react"
import Link from "next/link"

const ITEMS = [
    {
        icon_url: '/images/icons/ic-phone-white.svg',
        link_url: '/'
    },
    {
        icon_url: '/images/icons/ic-zalo-white.svg',
        link_url: '/'
    },
    {
        icon_url: '/images/icons/ic-mail-white.svg',
        link_url: '/'
    },
    {
        icon_url: '/images/icons/ic-location-white.svg',
        link_url: '/'
    }
]

const Navigation = () => {

  return (
    <div className="shadow-lg lg:flex p-3 rounded-tl-[5px] rounded-bl-[5px] rounded-tr-none rounded-br-none hidden items-center justify-center flex-col gap-2 fixed top-[25%] right-0 z-[999990] bg-white">
        {
            ITEMS.length > 0 &&
            ITEMS.map((item, index) => {
                return (
                    <Link href={item.link_url} target="_blank" key={index}>
                        <a className="w-[43px] flex items-center justify-center h-[43px] rounded-[100rem] bg-primary">
                            <img src={item.icon_url} alt="icon" className="cursor-pointer w-[22px] h-[22px]"/>
                        </a>
                    </Link>
                )
            })
        }
    </div>
  )
}

export default Navigation
