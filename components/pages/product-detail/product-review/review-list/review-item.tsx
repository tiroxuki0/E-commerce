import React from "react"
import Image from "next/image"
import {RatingStar} from "rating-star"
import {useLanguage} from "hooks/useLanguage"
import {PRODUCT_REVIEW_MODEL} from "models/product-review.model"
import {PRODUCT_MEDIA_MODEL} from "models/product.model"
import {convertDateServer, replaceUrlImage} from "helpers/base.helper"
import {renderReviewCustomerName} from "helpers/product.helper"
import {DEFAULT_LANGUAGE, MEDIA_TYPE} from "constants/base.constant"
import {FaRegUser} from "react-icons/fa"
import {IoPlayCircle} from "react-icons/io5"
import {isArray} from "rxjs/internal-compatibility";

interface Props {
    item: PRODUCT_REVIEW_MODEL
    handleSelectedMedia: (index: number, mediaList: PRODUCT_MEDIA_MODEL[]) => void
}

const ReviewItem = ({item, handleSelectedMedia}: Props) => {
    const {t, locale} = useLanguage()

    const renderReviewMedia = () => {
        let mediaList: PRODUCT_MEDIA_MODEL[] = []
        try {
            if (item?.images !== "[null]" && JSON.parse(item?.images)?.length > 0) {
                JSON?.parse(item?.images)?.forEach((media: string) => {
                    return mediaList.push({url: media, media_type: MEDIA_TYPE.IMAGE})
                })
            }
            if (item?.videos !== "[null]" && JSON.parse(item?.videos)?.length > 0) {
                JSON?.parse(item?.videos)?.forEach((media: string) => {
                    return mediaList.push({url: media, media_type: MEDIA_TYPE.VIDEO})
                })
            }
        } catch (e) {
        }

        if (mediaList && mediaList.length > 0) {
            return (
                <div className="flex items-center flex-wrap">
                    {
                        mediaList.map((media, index) => {
                            const mediaUrl = replaceUrlImage(media?.url)
                            return (
                                <div className="relative cursor-pointer w-[82px] h-[82px] min-w[82px] mr-[5px] mt-[9px]"
                                     onClick={() => handleSelectedMedia(index, mediaList)}
                                     key={index}>
                                    {
                                        media.media_type === MEDIA_TYPE.IMAGE &&
                                        <Image src={mediaUrl}
                                               layout="fill"
                                               priority
                                               objectFit="cover"
                                               alt={media.url}/>
                                    }
                                    {
                                        media.media_type === MEDIA_TYPE.VIDEO &&
                                        <>
                                            <IoPlayCircle size={30}
                                                          color="white"
                                                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9]"/>
                                            <video src={mediaUrl}
                                                   className="absolute object-cover top-0 left-0 right-0 bottom-0 w-full h-full"
                                                   muted />
                                        </>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
        return <></>
    }

    const renderType = () => {
        if (item?.type) {
            try {
                const type = JSON.parse(item?.type)
                return type?.[locale || DEFAULT_LANGUAGE]
            } catch (e) {
                return ''
            }
        }
    }

    const renderFlavors = () => {
        if (item?.type) {
            try {
                const flavor = JSON.parse(item?.flavor)
                let string = ''
                if (flavor && isArray(flavor) && flavor?.length > 0) {
                    for (const item of flavor) {
                        string = string + (string === '' ? '' : ', ') + item?.[locale || DEFAULT_LANGUAGE]
                    }
                }
                return string
            } catch (e) {
                return ''
            }
        }
    }

    return (
        <div className="border-t-review border-t-[1px] first:border-t-0 box-border py-[25px]">
            <div className="flex justify-between">
                <div className="grid grid-cols-[55px_1fr] gap-x-[16px]">
                    <div className="w-full pt-[100%] h-0 overflow-hidden relative rounded-full border-primary">
                        {
                            (item?.customer?.avatar || item.user_image)
                                ? <Image src={replaceUrlImage(item?.customer?.avatar || item.user_image || '')}
                                         priority
                                         objectFit="cover"
                                         alt={item?.customer?.avatar || item.user_image || ''}
                                         layout="fill"/>
                                : <FaRegUser className="w-full h-full p-[10px] absolute top-0 left-0 right-0 bottom-0" color="var(--color-primary)"/>
                        }
                    </div>
                    <div>
                        <b className="text-black text-[16px]">{renderReviewCustomerName(item)}</b>
                        <div className="flex items-center">
                            {
                                item?.type && <p className="text-[14px] font-[500] text-gray"><span className="text-black">{t.form}: </span>{renderType()}</p>
                            }
                            {
                                (item?.type && item?.flavor) && <hr className="h-[14px] border-0 w-[1px] mx-[14px] bg-black"/>
                            }
                            {
                                item?.flavor && <p className="text-[14px] font-[500] text-gray"><span className="text-black">{t.flavor}: </span>{renderFlavors()}</p>
                            }
                        </div>
                    </div>
                </div>
                <p className="text-[14px] font-[500] text-black text-right">{convertDateServer(item.createdAt)}</p>
            </div>
            <div className="mt-[21px] flex items-center">
                <RatingStar id={`reviewRating${item.id}`}
                            rating={item.totalStar || 0}
                            numberOfStar={5}
                            noBorder
                            size={22}
                            maxScore={5}/>
                <b className="border-l-[1px] text-[14px] border-l-primary pl-[5px] ml-[5px] text-primary">{item.is_shopee ? 'SHOPEE' : 'WEBSITE'}</b>
            </div>
            <p className="font-[500] text-black text-[16px] mt-[21px]">{item?.message || ""}</p>
            {
                renderReviewMedia()
            }
            {
                (item.reply_reviews && item.reply_reviews?.[0]) &&
                <div className="relative text-[14px] text-black bg-primary-lighter px-[21px] py-[12px] mt-[26px] before:reply-review">
                    <p className="font-[500]">{t.sellerResponse}</p>
                    <p className="mt-[9px] leading-[1.25]">{item.reply_reviews[0].message}</p>
                </div>
            }
        </div>
    )
}

export default ReviewItem
