import React, {memo} from "react"
import Image from 'next/image'
import {useLanguage} from "hooks/useLanguage"
import Link from "next/link"
import {replaceUrlImage} from "helpers/base.helper"

const StoreItem = ({item, className}: { item: any, className?: string }) => {
    const {t} = useLanguage()

    return (
        <div className={`lg:w-full ${className || ''}`}>
            <div className="w-full h-0 pt-[53.2846715328%] relative overflow-hidden">
                <Link href={`/cua-hang`}>
                    <a className="w-full h-full top-0 left-0 right-0 bottom-0 rounded-common absolute">
                        <Image src={replaceUrlImage(item?.image_url || "")}
                               objectFit="contain"
                               priority={true}
                               alt="media"
                               layout='fill'/>
                    </a>
                </Link>
            </div>
            <Link href={`/cua-hang`}>
                <a className="block text-[16px] truncate lg:text-[23px] lg:mt-[20px] mt-[12px] font-[500] leading-[1.25] capitalize text-title">
                    {item.name || ''}
                </a>
            </Link>
            <p className="lg:text-[16px] text-[14px] text-primary lg:mt-[13px] mt-[8px]">
                <span className="font-[600] pr-[4px]">{t.address}:</span>
                {item.description || ''}
            </p>
            <Link href="/cua-hang">
                <a className="w-fit text-primary flex items-center justify-center lg:mt-[25px] font-[500] mt-[13px] lg:text-[16px] text-[14px]">
                    {t.viewAllProduct}
                    <span className="block w-[24px] h-[24px] relative ml-[7px]">
                        <Image src={'/images/icons/ic-arrow-right.svg'}
                               alt="icon"
                               objectFit="cover"
                               priority={true}
                               layout='fill'/>
                    </span>
                </a>
            </Link>
        </div>
    )
}

export default memo(StoreItem)
