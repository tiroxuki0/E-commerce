import {PRODUCT_MEDIA_MODEL} from "models/product.model"
import Modal from "components/common/modal"
import {MEDIA_TYPE} from "constants/base.constant"
import Image from "next/image"
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react"
import {
    Keyboard, Navigation, Pagination, Zoom
} from 'swiper'
import {useEffect, useRef, useState} from "react"
import useDeviceDetect from "hooks/useDeviceDetect"
import {replaceUrlImage} from "helpers/base.helper"

import "swiper/swiper-bundle.css"

interface Props {
    closeDrawer: () => void
    status: boolean
    mediaList: Array<PRODUCT_MEDIA_MODEL>
    changeActiveMedia: (index: number) => void
    activeIndex: number
}
const ModalMedia = (props: Props) => {
    const [zoomOut, setZoomOut] = useState(false)
    const [zoomIn, setZoomIn] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [muted, setMuted] = useState(false)
    const swiperRef = useRef<SwiperRef>(null)
    const currentDevice = useDeviceDetect()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(currentDevice.isMobile())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCloseModal = () => {
        document.getElementsByTagName('html')[0].style.overflow= "visible"
        props.closeDrawer()
    }

    const handleZoomIn = () => {
        swiperRef.current?.swiper?.zoom?.in()
        setZoomIn(true)
        setZoomOut(false)
    }

    const handleZoomOut = () => {
        swiperRef.current?.swiper?.zoom?.out()
        setZoomOut(true)
        setZoomIn(false)
    }

    const handleOpenFullScreen = () => {
        const elem = document.getElementById("mediaFullScreen")
        if (!isFullScreen) {
            if (elem) {
                if (elem?.requestFullscreen) {
                    elem.requestFullscreen()
                } else if (elem['webkitRequestFullscreen']) { /* Safari */
                    elem['webkitRequestFullscreen']()
                } else if (elem['msRequestFullscreen']) { /* IE11 */
                    elem['msRequestFullscreen']()
                }
            }
            setIsFullScreen(true)
        } else {
            if (document?.exitFullscreen) {
                document.exitFullscreen()
            } else if (document['webkitExitFullscreen']) { /* Safari */
                document['webkitExitFullscreen']()
            } else if (document['msExitFullscreen']) { /* IE11 */
                document['msExitFullscreen']()
            }
            setIsFullScreen(false)
        }
    }

    const handleChangeSlide = (swiper: any) => {
        props.changeActiveMedia(swiper?.activeIndex)
        setZoomIn(false)
        setZoomOut(true)
        setMuted(props.mediaList[swiper.activeIndex]?.media_type !== MEDIA_TYPE.VIDEO)
        const mediaVideo = document.getElementById('mediaVideo')
        if (mediaVideo) {
            mediaVideo['play']()
        }
    }

    const handleChangeZoom = (e: any) => {
        if (e.zoom?.currentScale > 1) {
            setZoomOut(true)
            setZoomIn(false)
        } else {
            setZoomOut(false)
            setZoomIn(true)
        }
    }

    const handleClickSwiperSlide = (e: any) => {
        if (e?.target?.nodeName !== 'IMG' && e?.target?.nodeNam !== 'VIDEO') {
            handleCloseModal()
        }
    }

    return (
        <Modal className="w-full h-full z-[999999]"
               classNameContainer="h-full w-full"
               status={props.status}
               closedRawer={handleCloseModal}
               fullWidth={true}
        >
            {
                (props.mediaList && props.mediaList.length > 0) &&
                <div className="flex flex-col justify-between h-full w-full" id="mediaFullScreen">
                    <div className="h-full w-full select-none flex flex-col items-center relative">
                        <div className="h-[42px] w-full bg-black relative flex items-center justify-between lg:px-[32px] pr-[18px] pl-[17px]">
                            <span className="text-white text-[15px] leading-[1.5] lg:block hidden">{(props.activeIndex + 1)}/{props.mediaList.length}</span>
                            <div className="flex items-center lg:w-auto lg:justify-start lg:flex-row w-full justify-between flex-row-reverse">
                                <div className="flex items-center lg:mr-[88.5px] mr-0">
                                    {
                                        props.mediaList[props.activeIndex]?.media_type === MEDIA_TYPE.IMAGE &&
                                        <>
                                            <div className="px-[11.5px] cursor-pointer" onClick={handleZoomOut}>
                                                <Image src={zoomOut ? "/images/icons/ic-zoom-out-disabled.svg" : "/images/icons/ic-zoom-out.svg"}
                                                       width={26}
                                                       height={26}
                                                       objectFit="contain"
                                                       className="lg:h-[26px] lg:w-[26px] w-[24px] h-[24px]"
                                                       alt="icon"/>
                                            </div>
                                            <div className="px-[11.5px] cursor-pointer" onClick={handleZoomIn}>
                                                <Image src={zoomIn ? "/images/icons/ic-zoom-in-disabled.svg" : "/images/icons/ic-zoom-in.svg"}
                                                       width={26}
                                                       height={26}
                                                       objectFit="contain"
                                                       className="lg:h-[26px] lg:w-[26px] w-[24px] h-[24px]"
                                                       alt="icon"/>
                                            </div>
                                        </>
                                    }
                                    <div className="px-[11.5px] cursor-pointer" onClick={handleOpenFullScreen}>
                                        <Image src={"/images/icons/ic-scan.svg"}
                                               width={20}
                                               height={20}
                                               objectFit="contain"
                                               className="h-[20px] w-[20px]"
                                               alt="icon"/>
                                    </div>
                                </div>
                                <div className="cursor-pointer" onClick={() => handleCloseModal()}>
                                    <Image src={isMobile ? "/images/icons/ic-prev-white.svg" : "/images/icons/ic-close-white.svg"}
                                           width={26}
                                           height={26}
                                           objectFit="cover"
                                           alt="icon"/>
                                </div>
                            </div>
                        </div>
                        <div className="media-swiper relative w-full">
                            <div className="absolute top-1/2 left-[83px] -translate-y-1/2 cursor-pointer drop-shadow-navigation swiper-navigation-prev-1 z-[999] lg:flex hidden">
                                <Image src="/images/icons/ic-prev-circle.svg"
                                       width={37}
                                       height={37}
                                       objectFit="cover"
                                       alt="prevIcon"/>
                            </div>
                            <Swiper
                                ref={swiperRef}
                                slidesPerView={1}
                                spaceBetween={12}
                                onSlideChange={handleChangeSlide}
                                zoom={{maxRatio: 1.5}}
                                onZoomChange={handleChangeZoom}
                                pagination
                                keyboard={{enabled: true}}
                                initialSlide={props.activeIndex}
                                navigation={{
                                    prevEl: '.swiper-navigation-prev-1',
                                    nextEl: '.swiper-navigation-next-1'
                                }}
                                modules={[Navigation, Zoom, Pagination, Keyboard]}
                            >
                                {
                                    props.mediaList.map((item, index) => {
                                        return (
                                            <SwiperSlide className="flex items-center justify-center" key={index} onClick={handleClickSwiperSlide}>
                                                <div className="relative w-full h-full flex items-center justify-center">
                                                    {
                                                        item.media_type === MEDIA_TYPE.IMAGE
                                                            ? <Image src={replaceUrlImage(item?.url)}
                                                                     objectFit="contain"
                                                                     width={0}
                                                                     height={0}
                                                                     layout="responsive"
                                                                     className="media-swiper-item"
                                                                     alt={"mediaImage"}/>
                                                            : (
                                                                <video autoPlay={false}
                                                                       muted={muted}
                                                                       playsInline
                                                                       controls
                                                                       id={'mediaVideo'}
                                                                       className="media-swiper-item"
                                                                >
                                                                    <source src={replaceUrlImage(item?.url)}/>
                                                                </video>
                                                            )
                                                    }
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                            <div className="absolute top-1/2 right-[83px] -translate-y-1/2 cursor-pointer drop-shadow-navigation swiper-navigation-next-1 z-[999] lg:flex hidden">
                                <Image src="/images/icons/ic-next-circle.svg"
                                       width={37}
                                       height={37}
                                       objectFit="cover"
                                       alt="prevIcon"/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Modal>
    )
}

export default ModalMedia