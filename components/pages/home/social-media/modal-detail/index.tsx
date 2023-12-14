import React, {useEffect, useState} from "react"
import {useLanguage} from "hooks/useLanguage"
import Modal from "components/common/modal"
import {Swiper, SwiperSlide} from "swiper/react"
import {EffectCoverflow, Navigation} from "swiper"
import SlideItem from "./slide-item"
import Image from "next/image"
import useDeviceDetect from "hooks/useDeviceDetect"

import "swiper/swiper-bundle.css"

interface Props {
    status: boolean
    onCloseModal: () => void
    items: Array<any>
    initialIndex: number
}

const LIMIT = 3

const ModalDetail = ({items, status, onCloseModal, initialIndex}: Props) => {
    const { t } = useLanguage()
    const currentDevice = useDeviceDetect()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(currentDevice.isMobile())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Modal status={status}
               fullWidth
               classNameContainer="lg:h-auto h-[80vh] lg:overflow-visible overflow-hidden"
               className="lg:items-center items-end"
               close={onCloseModal}>
            <div className="w-full social-slide-container relative lg:px-[105px] px-0 lg:pt-0 pt-[37px] h-full max-h-full overflow-y-auto">
                <div className="flex justify-end lg:hidden px-[10px] pt-[10px] absolute top-0 right-0">
                    <button className="w-[24px] h-[24px] relative" onClick={onCloseModal}>
                        <Image src="/images/icons/ic-close.svg"
                               layout="fill"
                               objectFit="cover"
                               alt="close icon"/>
                    </button>
                </div>
                {
                    items && items.length > 0 &&
                    <>
                        {
                            (isMobile && items[initialIndex]) &&
                            <SlideItem item={items[initialIndex]}/>
                        }
                        {
                            !isMobile &&
                            <>
                                <div className="swiper-button-prev swiper-button-prev1"/>
                                <Swiper slidesPerView="auto"
                                        slidesPerGroup={1}
                                        spaceBetween={67}
                                        initialSlide={initialIndex}
                                        centeredSlides={true}
                                        centeredSlidesBounds={true}
                                        // loop={true}
                                        effect="coverflow"
                                        coverflowEffect={{
                                            rotate: 0,
                                            stretch: 0,
                                            depth: 0,
                                            modifier: 1,
                                            slideShadows: false
                                        }}
                                        navigation={{
                                            nextEl: '.swiper-button-next1',
                                            prevEl: '.swiper-button-prev1'
                                        }}
                                        modules={[Navigation, EffectCoverflow]}
                                >
                                    {
                                        items?.map((item, index) => {
                                            return (
                                                <SwiperSlide key={index} className="overflow-hidden">
                                                    <SlideItem item={item}/>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                                <div className="swiper-button-next swiper-button-next1"/>
                            </>
                        }
                    </>
                }
            </div>
        </Modal>
    )
}

export default ModalDetail
