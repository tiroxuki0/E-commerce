import React from "react"
import Image from 'next/image'
import {convertFollowers, replaceUrlImage} from "helpers/base.helper"
import {formatCurrency} from "helpers/currency-format.helper"
import {useLanguage} from "hooks/useLanguage"
import Link from "next/link"

interface Props {
    followers: number
    linkUrl: string
    socialAvatar: string
    socialName: string
    t: any
}

const SocialItem = ({followers, linkUrl, socialAvatar, socialName, t}: Props) => {
    return (
        <div className="flex items-center justify-between lg:my-[17.5px] my-[11px]">
            <div className="flex items-center">
                <div className="lg:w-[47px] lg:h-[47px] w-[49px] h-[49px] rounded-full relative">
                    <Image src={socialAvatar || ''}
                           objectFit="cover"
                           priority={true}
                           layout='fill'
                           alt="media"
                    />
                </div>
                <div className="pl-[10px]">
                    <h4 className="text-[16px] text-black font-[700] leading-[1.25]">{socialName || ''}</h4>
                    <p className="mt-[3px] text-[14px] text-black font-[500]">{convertFollowers(followers || 0)}{t.followers}</p>
                </div>
            </div>
            <Link href={linkUrl || '/'}>
                <a className="text-[14px] ml-[10px] whitespace-nowrap text-black bg-link-gray hover:text-white hover:bg-primary font-[600] text-center rounded-[40px] uppercase px-[13px] py-[9px]">{t.follow}</a>
            </Link>
        </div>
    )
}

const SlideItem = ({item}: { item: any }) => {
    const {t} = useLanguage()

    return (
        <div className="w-full rounded-[15px] pt-[7px] lg:p-0 bg-white lg:flex block social-item">
            <div className="w-full social-item-image lg:px-0 px-[10px]">
                <div className="w-full h-0 pt-[100%] relative lg:rounded-[15px] rounded-0 overflow-hidden">
                    <Image src={item.image_url || ''}
                           objectFit="cover"
                           priority={true}
                           alt="media"
                           layout="fill"/>
                </div>
            </div>

            <div className="lg:ml-[31px] ml-0 lg:hidden block social-item-info">
                <div className="flex items-center lg:p-0 pt-[11px] px-[10px]">
                    <div className="lg:w-[54px] lg:h-[54px] w-[44px] h-[44px] rounded-full overflow-hidden relative">
                        <Image src={item.user?.avatar || ''}
                               objectFit="cover"
                               priority={true}
                               layout='fill'
                               alt="media"
                        />
                    </div>
                    <p className="lg:ml-[10px] ml-[8px] text-black font-[600] lg:text-[16px] text-[14px] p-0">{item.user?.name || ''}</p>
                </div>
                <div className="lg:border-t-gray border-t-primary border-t-[1px] lg:mt-[17px] mt-[12px] lg:pt-[13px] pt-[9px] lg:px-0 px-[10px]">
                    <h3 className="text-title lg:text-[32px] text-[16px] font-[600]">{item.title || ''}</h3>
                    <p className="text-primary lg:text-[14px] text-[12px] font-[500] lg:pt-[13px] pt-[8px] leading-[1.25]">{item.description || ''}</p>
                </div>
                <div className="lg:border-t-gray border-t-primary border-t-[1px] lg:mt-[13px] lg:pt-[16.5px] mt-[12px] pt-[10px] lg:px-0 px-[10px]">
                    <SocialItem t={t}
                                socialAvatar="/images/icons/ic-tiktok-avatar.svg"
                                linkUrl={item.link_url}
                                followers={item.tiktok_followers}
                                socialName="Tiktok"/>
                    <SocialItem t={t}
                                socialAvatar="/images/icons/ic-instagram-avatar.svg"
                                linkUrl={item.link_url}
                                followers={item.instagram_followers}
                                socialName="Instagram"/>
                </div>
                <div className="shadow-slide-item lg:mx-0 mx-[10px] lg:mb-0 mb-[10px] lg:mt-[13.5px] mt-[21px] rounded-[6px] lg:px-[7px] lg:py-[6px] p-[8px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="md:w-[76px] md:h-[76px] w-[60px] h-[60px] rounded-[6px] bg-product relative">
                                <Image src={replaceUrlImage(item.product?.image_url)}
                                       objectFit="cover"
                                       priority={true}
                                       layout='fill'
                                       alt="media"
                                />
                            </div>
                            <div className="pl-[10px]">
                                <h4 className="lg:text-[18px] text-[16px] text-primary font-[500] leading-[1.25] truncate">{item.product?.name || ''}</h4>
                                <p className="mt-[4px] text-[20px] text-black font-[700]">{formatCurrency(item.product?.price || 0)}</p>
                            </div>
                        </div>
                        <Link href={item.tiktok_url || ''}>
                            <a className="block w-fit lg:text-[18px] text-[14px] ml-[10px] mr-[8px] whitespace-nowrap text-white bg-primary font-[600] text-center rounded-[6px] capitalize px-[17px] py-[12px]">{t.buyNow}</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SlideItem
