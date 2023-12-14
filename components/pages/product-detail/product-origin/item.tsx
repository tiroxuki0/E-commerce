import React from "react"
import Image from "next/image"

interface Props {
    imageUrl: string
    title: string
    content: string
    className: string
}

const Item = ({imageUrl, className, title, content}: Props) => {

    return (
        <div className="flex lg:items-center items-start">
            <div className={`relative ${className}`}>
                <Image src={imageUrl}
                       layout="fill"
                       alt="itemImage"
                       objectFit="contain"/>
            </div>
            <div className="lg:pl-[12px] pl-[10px]">
                <h5 className="text-primary font-[700] uppercase lg:text-[18px] text-[14px]">{title}</h5>
                <p className="lg:text-[16px] text-[14px] text-primary lg:mt-[5px] mt-[4px]">{content}</p>
            </div>
        </div>
    )
}

export default Item
