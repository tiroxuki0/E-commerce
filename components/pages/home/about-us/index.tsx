import React, {memo} from "react"
import {useLanguage} from "hooks/useLanguage"
import Image from 'next/image'
import Link from 'next/link'
import {usePageComponent} from "stores/page-component"
import {replaceUrlImage} from "helpers/base.helper"

const AboutUs = () => {
    const { t } = useLanguage()
    const [store] = usePageComponent()

    if (!store.pageComponent.itemHomeAboutUs) return <></>

    return (
        <>
            <div className="container lg:flex block items-center justify-between lg:pt-[108px] pt-0">
                <div className="lg:w-[52.1527777778%] w-full lg:py-[20px] pt-[38px]">
                    <h3 className="lg:text-[43px] text-[35px] font-[800] leading-[1.25] text-title capitalize">{store.pageComponent.itemHomeAboutUs.title || ""}</h3>
                    <p className="lg:text-[16px] text-[14px] leading-[1.25] font-[500] text-primary lg:mt-[25px] mt-[23px]">
                        {store.pageComponent.itemHomeAboutUs.description || ""}
                    </p>
                    <div className="flex items-center lg:mt-[35px] mt-[26px]">
                        <Link href="/gioi-thieu">
                            <a className="link-btn mr-[20px]">{t.readMore}</a>
                        </Link>
                        <Link href="/product">
                            <a className="link-btn">{t.buyNow}</a>
                        </Link>
                    </div>
                </div>
                <div className="lg:w-[35.9722222222%] w-full lg:mt-0 mt-[67px]">
                    <div className="relative w-full h-0 pt-[93.4362934363%] overflow-hidden">
                        <Image src={replaceUrlImage(store.pageComponent.itemHomeAboutUs.image_url || "")}
                               objectFit="cover"
                               priority={true}
                               alt="media"
                               layout='fill'/>
                    </div>
                </div>
            </div>
            <div className="lg:mt-[85px] mt-[62px] border-t-[1px] border-t-primary">
                <div className="container lg:grid lg:grid-cols-4 lg:gap-[84px] flex flex-wrap gap-x-[38px] gap-y-[19px] lg:py-[57px] py-[26px]">
                    {
                        store.pageComponent.itemHomeAboutUs.item_details && store.pageComponent.itemHomeAboutUs.item_details.length &&
                        store.pageComponent.itemHomeAboutUs.item_details?.map((item: any, index: number) => {
                            return (
                                <div style={{flex: '1 0 auto'}} className={`lg:w-full overflow-hidden ${(index + 1) % 2 === 0 ? 'w-[36.2857142857%]' : 'w-[52.8571428571%]'}`} key={index}>
                                    <div className={`lg:w-[131px] ${(index + 1) % 2 === 0 ? 'w-[82%]' : 'w-[72.131147541%]'}`}>
                                        <div className="h-0 w-full pt-[100%] relative">
                                            <Image src={replaceUrlImage(item.image_url || "")}
                                                   objectFit="cover"
                                                   priority={true}
                                                   alt="media"
                                                   layout='fill'/>
                                        </div>
                                    </div>
                                    <h4 className="mt-[4px] uppercase font-[700] text-title lg:text-[16px] text-[14px]">{item.title || ''}</h4>
                                    <p className="lg:mt-[7px] mt-[9px] leading-[1.25] text-primary lg:text-[14px] text-[12px] font-[500]">{item.description || ''}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                store.pageComponent.itemHomePartner && store.pageComponent.itemHomePartner.length > 0 &&
                <div className="w-full bg-primary lg:py-[32px] py-[15px] lg:mt-[30px] mt-[25px] scroll-images">
                    <div className="flex items-center">
                        {
                            store.pageComponent.itemHomePartner.map((item, index) => {
                                return <img key={index}
                                            className="lg:h-[91px] h-[43px] w-auto lg:mx-[81.5px] mx-[27.5px]"
                                            src={replaceUrlImage(item.image_url || "")}
                                            alt="certifications"
                                />
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default memo(AboutUs)
