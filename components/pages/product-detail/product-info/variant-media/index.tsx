import React, {useState} from "react"
import Image from "next/image"
import { Navigation, Thumbs, Mousewheel, Pagination } from 'swiper'
import {Swiper, SwiperSlide} from "swiper/react"
import {useProduct} from "stores/product"
import {replaceUrlImage} from "helpers/base.helper"
import {MEDIA_TYPE} from "constants/base.constant"
import ModalMedia from "components/common/product/modal-media"

import "swiper/swiper-bundle.css"

const VariantMedia = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
    const [swiperIndexActive, setSwiperIndexActive] = useState<any>(null)
    const [isShowModalFullMedia, setIsShowModalFullMedia] = useState(false)
    const [storeProduct] = useProduct()

    const changeSwiper = (swiper: any) => {
        setSwiperIndexActive(swiper?.activeIndex)
    }

    const handleMediaSelected = (index: number) => {
        setIsShowModalFullMedia(true)
        setSwiperIndexActive(index)
    }

    const handleChangeActiveMedia = (index: number) => {
        setSwiperIndexActive(index)
    }

    const handleCloseModal = () => {
        setIsShowModalFullMedia(false)
        const mediaVideo = document.getElementById('mediaVideo')
        if (mediaVideo) {
            mediaVideo['pause']()
        }
    }

    return (
        <>
            <div className="lg:w-[569px] w-full">
                {
                    storeProduct.product?.product_media && storeProduct.product.product_media.length > 0 &&
                    <>
                        <div className="variant-media-swiper__big relative w-full">
                            <div className="absolute top-1/2 left-[12px] lg:w-[37px] lg:h-[37px] w-[25px] h-[25px] rounded-full -translate-y-1/2 cursor-pointer shadow-navigation swiper-navigation-prev-2 z-[999] flex">
                                <Image src="/images/icons/ic-prev-circle.svg"
                                       layout="fill"
                                       objectFit="cover"
                                       alt="prevIcon"/>
                            </div>
                            <Swiper
                                thumbs={{swiper: thumbsSwiper && !thumbsSwiper?.destroyed ? thumbsSwiper : null}}
                                slidesPerView={1}
                                slidesPerGroup={1}
                                spaceBetween={20}
                                onSlideChange={changeSwiper}
                                allowSlidePrev={storeProduct.product.product_media?.length > 1}
                                allowSlideNext={storeProduct.product.product_media?.length > 1}
                                mousewheel={{
                                    forceToAxis: true,
                                    sensitivity: 0.5,
                                    thresholdDelta: 14
                                }}
                                preventInteractionOnTransition
                                watchSlidesProgress
                                watchOverflow
                                pagination
                                breakpoints={{
                                    769: {
                                        pagination: false
                                    }
                                }}
                                navigation={{
                                    prevEl: '.swiper-navigation-prev-2',
                                    nextEl: '.swiper-navigation-next-2'
                                }}
                                modules={[Navigation, Thumbs, Mousewheel, Pagination]}
                            >
                                {
                                    storeProduct.product.product_media.map((item, index) => {
                                        const replaceMediaUrl = replaceUrlImage(item?.url)

                                        return (
                                            <SwiperSlide
                                                key={index}
                                                className="p-[3px]"
                                            >
                                                {
                                                    item.media_type === MEDIA_TYPE.IMAGE &&
                                                    <div className="relative productImageJs w-full h-0 pt-[100%]"
                                                         onClick={() => handleMediaSelected(index)}
                                                    >
                                                        <Image src={replaceMediaUrl}
                                                               objectFit="cover"
                                                               priority={true}
                                                               layout='fill'
                                                               alt="mediaImage"/>
                                                    </div>
                                                }
                                                {
                                                    item.media_type === MEDIA_TYPE.VIDEO &&
                                                    <>
                                                        {
                                                            (swiperIndexActive === index || !item.url_thumb) &&
                                                            <div className="overflow-hidden pt-[100%] relative h-0 w-full bg-product-image">
                                                                <video autoPlay
                                                                       playsInline
                                                                       loop
                                                                       poster={replaceMediaUrl}
                                                                       id={storeProduct.product?.id}
                                                                       muted={true}
                                                                       onClick={() => handleMediaSelected(index)}
                                                                       className="object-cover absolute top-0 left-0 right-0 bottom-0 w-full h-full"
                                                                       src={replaceMediaUrl}/>
                                                            </div>
                                                        }
                                                        {
                                                            (swiperIndexActive !== index || item.url_thumb) &&
                                                            <div className="relative productImageJs lg:h-full h-auto lg:pt-0 pt-[100%]"
                                                                 onClick={() => handleMediaSelected(index)}
                                                            >
                                                                <Image src={replaceMediaUrl}
                                                                       objectFit="cover"
                                                                       priority={true}
                                                                       layout='fill'
                                                                       alt="mediaImage"/>
                                                            </div>
                                                        }
                                                    </>
                                                }
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                            <div className="absolute top-1/2 right-[12px] lg:w-[37px] lg:h-[37px] w-[25px] h-[25px] rounded-full -translate-y-1/2 cursor-pointer shadow-navigation swiper-navigation-next-2 z-[999] flex">
                                <Image src="/images/icons/ic-next-circle.svg"
                                       layout="fill"
                                       objectFit="cover"
                                       alt="prevIcon"/>
                            </div>
                        </div>
                        <div className="variant-media-swiper__small w-full">
                            <Swiper
                                onSwiper={(swiper) => setThumbsSwiper(swiper)}
                                spaceBetween={8}
                                slidesPerView="auto"
                                watchSlidesProgress
                                watchOverflow
                                modules={[Thumbs]}
                            >
                                {
                                    storeProduct.product.product_media.map((item, index) => {
                                        const replaceMediaUrl = replaceUrlImage(item.url_thumb || item.url)

                                        return (
                                            <SwiperSlide key={index} className="p-[1px]">
                                                <div className="overflow-hidden pt-[100%] relative h-0 w-full bg-product-image">
                                                    {
                                                        (item.media_type === MEDIA_TYPE.IMAGE || (item.media_type === MEDIA_TYPE.VIDEO && item.url_thumb)) &&
                                                        <Image src={replaceMediaUrl}
                                                               objectFit="cover"
                                                               priority={true}
                                                               layout='fill'
                                                               alt="mediaImage"/>
                                                    }
                                                    {
                                                        (item.media_type === MEDIA_TYPE.VIDEO && !item.url_thumb) &&
                                                        <video playsInline
                                                               loop
                                                               id={storeProduct.product?.id}
                                                               muted={true}
                                                               className="object-cover absolute top-0 left-0 right-0 bottom-0 w-full h-full"
                                                               src={replaceMediaUrl}/>
                                                    }
                                                    {
                                                        item.media_type === MEDIA_TYPE.VIDEO &&
                                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                            <Image src="/images/icons/ic-play-video.svg"
                                                                   objectFit="cover"
                                                                   priority={true}
                                                                   width={24}
                                                                   height={24}
                                                                   alt="playIcon"/>
                                                        </div>
                                                    }
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                    </>
                }
            </div>
            {
                isShowModalFullMedia &&
                <ModalMedia closeDrawer={handleCloseModal}
                            status={isShowModalFullMedia}
                            mediaList={storeProduct.product.product_media || []}
                            changeActiveMedia={handleChangeActiveMedia}
                            activeIndex={swiperIndexActive}
                />
            }
        </>
    )
}

export default VariantMedia
