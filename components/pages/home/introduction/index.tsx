import React, { memo, useEffect, useState } from "react"
import { useLanguage } from "hooks/useLanguage"
import useDeviceDetect from "hooks/useDeviceDetect"
import Image from 'next/image'
import Link from 'next/link'
import {usePageComponent} from "stores/page-component"
import {replaceUrlImage} from "helpers/base.helper"

const Introduction = () => {
    const { t } = useLanguage()
    const currentDevice = useDeviceDetect()
    const [pageComponent] = usePageComponent()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(currentDevice.isMobile())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!pageComponent.pageComponent.itemHomeIntroduce) return <></>

    return (
        <div className="w-full block lg:flex lg:mt-[94px] mt-[34px]">
            <div className="lg:w-[33.3854166667%] w-full">
                <div className="relative w-full h-full pt-[143.52574103%] overflow-hidden">
                    <Image src={replaceUrlImage(pageComponent.pageComponent.itemHomeIntroduce.image_url || "")}
                           objectFit="cover"
                           priority={true}
                           alt="media"
                           layout='fill'/>
                </div>
            </div>
            <div className="lg:w-[40.2083333333%] w-full relative bg-primary">
                <div className="absolute inset-x-0 lg:w-[29.6103896104%] w-[35.3846153846%]">
                    <div className="relative w-full h-0 lg:pt-[122.368421053%] pt-[84.0579710145%] overflow-hidden">
                        <Image src={`/images/featured-imgs/${isMobile ? 'img-featured-1-phone.webp' : 'img-featured-1-desktop.webp'}`}
                               objectFit="cover"
                               priority={true}
                               alt="media"
                               layout='fill'/>
                    </div>
                </div>
                <div className="flex flex-col py-[125px] lg:py-[63px] px-[20px] lg:px-[63px] justify-center h-full lg:min-h-[1px] min-h-[466px]">
                    <h2 className="uppercase text-white text-[35px] lg:text-[65px] font-[800] leading-[1.25]">{pageComponent.pageComponent.itemHomeIntroduce.title || ""}</h2>
                    <p className="text-[16px] lg:text-[18px] text-white mt-[17px] lg:mt-[61px]">{pageComponent.pageComponent.itemHomeIntroduce.description || ""}</p>
                    <Link href="/gioi-thieu">
                        <a className="mt-[17px] font-[600] lg:mt-[61px] box-border py-[9px] text-[14px] w-fit px-[34px] text-white hover:text-primary hover:bg-white border-white border-[1px] rounded-[10px]">{t.readMore}</a>
                    </Link>
                </div>
                <div className="absolute bottom-0 right-0 lg:w-[64.025974026%] w-[47.9487179487%]">
                    <div className="relative w-full h-0 lg:pt-[122.368421053%] pt-[120.320855615%] overflow-hidden">
                        <Image src={`/images/featured-imgs/${isMobile ? 'img-featured-2-phone.webp' : 'img-featured-2-desktop.webp'}`}
                               objectFit="cover"
                               priority={true}
                               alt="media"
                               layout='fill'/>
                    </div>
                </div>
            </div>
            <div className="lg:w-[26.40625%] w-full">
                <div className="relative w-full h-full pt-[181.459566075%] overflow-hidden">
                    <Image src={replaceUrlImage(pageComponent.pageComponent.itemHomeIntroduce.url || "")}
                           objectFit="cover"
                           priority={true}
                           alt="media"
                           layout='fill'/>
                </div>
            </div>
        </div>
    )
}

export default memo(Introduction)
