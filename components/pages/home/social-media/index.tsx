import React, {memo, useState} from "react"
import {useLanguage} from "hooks/useLanguage"
import Image from 'next/image'
import Link from 'next/link'
import {MEDIA_TYPE} from "constants/base.constant"
import ModalDetail from "components/pages/home/social-media/modal-detail";

interface Props {
    icon: string
    linkUrl: string
}

const SocialItem = (props: Props) => {
    return (
        <Link href={props.linkUrl || ''} target="_blank">
            <a className="block lg:mx-[17.5px] mx-[11px]">
                <Image src={props.icon || ''}
                       objectFit="cover"
                       priority={true}
                       alt="media"
                       height="23px"
                       width="23px"/>
            </a>
        </Link>
    )
}

const items = [
    {
        image_url: '/images/social-imgs/img-1.png',
        type: 'video',
        user: {
            name: 'huynhthimyduyen123',
            avatar: '/images/social-imgs/img-avatar.png'
        },
        tiktok_followers: 7400000,
        instagram_followers: 7400000,
        tiktok_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        instagram_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        title: 'Cà Phê Arabica & Robusta',
        description: 'Cà Phê Đóng Chai Zili Coffee sẵn sàng phục vụ bạn những lúc cần thêm caffein khi làm việc tại nhà hay chạy deadline với hội nhóm.Bật chế độ tỉnh táo với 3 sự lựa chọn: Cà Phê Đen, Cà Phê Sữa, Coldbrew--',
        product: {
            name: 'ROBUSTA ZILI',
            price: 220000,
            image_url: 'https://zili.sgp1.digitaloceanspaces.com/files/images/bd58fac6-ed58-45e4-a594-22010b4fd4de/blend-zili-coaster.webp',
            product_slug: 'ca-phe-blend-zili-coffee'
        }
    },
    {
        image_url: '/images/social-imgs/img-2.png',
        type: 'image',
        user: {
            name: 'huynhthimyduyen123',
            avatar: '/images/social-imgs/img-avatar.png'
        },
        tiktok_followers: 7400000,
        instagram_followers: 7400000,
        tiktok_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        instagram_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        title: 'Cà Phê Arabica & Robusta',
        description: 'Cà Phê Đóng Chai Zili Coffee sẵn sàng phục vụ bạn những lúc cần thêm caffein khi làm việc tại nhà hay chạy deadline với hội nhóm.Bật chế độ tỉnh táo với 3 sự lựa chọn: Cà Phê Đen, Cà Phê Sữa, Coldbrew--',
        product: {
            name: 'ROBUSTA ZILI',
            price: 220000,
            image_url: 'https://zili.sgp1.digitaloceanspaces.com/files/images/bd58fac6-ed58-45e4-a594-22010b4fd4de/blend-zili-coaster.webp',
            product_slug: 'ca-phe-blend-zili-coffee'
        }
    },
    {
        image_url: '/images/social-imgs/img-3.png',
        type: 'video',
        user: {
            name: 'huynhthimyduyen123',
            avatar: '/images/social-imgs/img-avatar.png'
        },
        tiktok_followers: 7400000,
        instagram_followers: 7400000,
        tiktok_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        instagram_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        title: 'Cà Phê Arabica & Robusta',
        description: 'Cà Phê Đóng Chai Zili Coffee sẵn sàng phục vụ bạn những lúc cần thêm caffein khi làm việc tại nhà hay chạy deadline với hội nhóm.Bật chế độ tỉnh táo với 3 sự lựa chọn: Cà Phê Đen, Cà Phê Sữa, Coldbrew--',
        product: {
            name: 'ROBUSTA ZILI',
            price: 220000,
            image_url: 'https://zili.sgp1.digitaloceanspaces.com/files/images/bd58fac6-ed58-45e4-a594-22010b4fd4de/blend-zili-coaster.webp',
            product_slug: 'ca-phe-blend-zili-coffee'
        }
    },
    {
        image_url: '/images/social-imgs/img-4.png',
        type: 'image',
        user: {
            name: 'huynhthimyduyen123',
            avatar: '/images/social-imgs/img-avatar.png'
        },
        tiktok_followers: 7400000,
        instagram_followers: 7400000,
        tiktok_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        instagram_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        title: 'Cà Phê Arabica & Robusta',
        description: 'Cà Phê Đóng Chai Zili Coffee sẵn sàng phục vụ bạn những lúc cần thêm caffein khi làm việc tại nhà hay chạy deadline với hội nhóm.Bật chế độ tỉnh táo với 3 sự lựa chọn: Cà Phê Đen, Cà Phê Sữa, Coldbrew--',
        product: {
            name: 'ROBUSTA ZILI',
            price: 220000,
            image_url: 'https://zili.sgp1.digitaloceanspaces.com/files/images/bd58fac6-ed58-45e4-a594-22010b4fd4de/blend-zili-coaster.webp',
            product_slug: 'ca-phe-blend-zili-coffee'
        }
    },
    {
        image_url: '/images/social-imgs/img-5.png',
        type: 'image',
        user: {
            name: 'huynhthimyduyen123',
            avatar: '/images/social-imgs/img-avatar.png'
        },
        tiktok_followers: 7400000,
        instagram_followers: 7400000,
        tiktok_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        instagram_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        title: 'Cà Phê Arabica & Robusta',
        description: 'Cà Phê Đóng Chai Zili Coffee sẵn sàng phục vụ bạn những lúc cần thêm caffein khi làm việc tại nhà hay chạy deadline với hội nhóm.Bật chế độ tỉnh táo với 3 sự lựa chọn: Cà Phê Đen, Cà Phê Sữa, Coldbrew--',
        product: {
            name: 'ROBUSTA ZILI',
            price: 220000,
            image_url: 'https://zili.sgp1.digitaloceanspaces.com/files/images/bd58fac6-ed58-45e4-a594-22010b4fd4de/blend-zili-coaster.webp',
            product_slug: 'ca-phe-blend-zili-coffee'
        }
    },
    {
        image_url: '/images/social-imgs/img-6.png',
        type: 'image',
        user: {
            name: 'huynhthimyduyen123',
            avatar: '/images/social-imgs/img-avatar.png'
        },
        tiktok_followers: 7400000,
        instagram_followers: 7400000,
        tiktok_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        instagram_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        title: 'Cà Phê Arabica & Robusta',
        description: 'Cà Phê Đóng Chai Zili Coffee sẵn sàng phục vụ bạn những lúc cần thêm caffein khi làm việc tại nhà hay chạy deadline với hội nhóm.Bật chế độ tỉnh táo với 3 sự lựa chọn: Cà Phê Đen, Cà Phê Sữa, Coldbrew--',
        product: {
            name: 'ROBUSTA ZILI',
            price: 220000,
            image_url: 'https://zili.sgp1.digitaloceanspaces.com/files/images/bd58fac6-ed58-45e4-a594-22010b4fd4de/blend-zili-coaster.webp',
            product_slug: 'ca-phe-blend-zili-coffee'
        }
    },
    {
        image_url: '/images/social-imgs/img-7.png',
        type: 'image',
        user: {
            name: 'huynhthimyduyen123',
            avatar: '/images/social-imgs/img-avatar.png'
        },
        tiktok_followers: 7400000,
        instagram_followers: 7400000,
        tiktok_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        instagram_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        title: 'Cà Phê Arabica & Robusta',
        description: 'Cà Phê Đóng Chai Zili Coffee sẵn sàng phục vụ bạn những lúc cần thêm caffein khi làm việc tại nhà hay chạy deadline với hội nhóm.Bật chế độ tỉnh táo với 3 sự lựa chọn: Cà Phê Đen, Cà Phê Sữa, Coldbrew--',
        product: {
            name: 'ROBUSTA ZILI',
            price: 220000,
            image_url: 'https://zili.sgp1.digitaloceanspaces.com/files/images/bd58fac6-ed58-45e4-a594-22010b4fd4de/blend-zili-coaster.webp',
            product_slug: 'ca-phe-blend-zili-coffee'
        }
    },
    {
        image_url: '/images/social-imgs/img-7.png',
        type: 'image',
        user: {
            name: 'huynhthimyduyen123',
            avatar: '/images/social-imgs/img-avatar.png'
        },
        tiktok_followers: 7400000,
        instagram_followers: 7400000,
        tiktok_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        instagram_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        title: 'Cà Phê Arabica & Robusta',
        description: 'Cà Phê Đóng Chai Zili Coffee sẵn sàng phục vụ bạn những lúc cần thêm caffein khi làm việc tại nhà hay chạy deadline với hội nhóm.Bật chế độ tỉnh táo với 3 sự lựa chọn: Cà Phê Đen, Cà Phê Sữa, Coldbrew--',
        product: {
            name: 'ROBUSTA ZILI',
            price: 220000,
            image_url: 'https://zili.sgp1.digitaloceanspaces.com/files/images/bd58fac6-ed58-45e4-a594-22010b4fd4de/blend-zili-coaster.webp',
            product_slug: 'ca-phe-blend-zili-coffee'
        }
    },
    {
        image_url: '/images/social-imgs/img-7.png',
        type: 'image',
        user: {
            name: 'huynhthimyduyen123',
            avatar: '/images/social-imgs/img-avatar.png'
        },
        tiktok_followers: 7400000,
        instagram_followers: 7400000,
        tiktok_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        instagram_url: 'https://www.tiktok.com/@017sypo/video/7086055354643057926?q=zili%20coffee&t=1678078474412',
        title: 'Cà Phê Arabica & Robusta',
        description: 'Cà Phê Đóng Chai Zili Coffee sẵn sàng phục vụ bạn những lúc cần thêm caffein khi làm việc tại nhà hay chạy deadline với hội nhóm.Bật chế độ tỉnh táo với 3 sự lựa chọn: Cà Phê Đen, Cà Phê Sữa, Coldbrew--',
        product: {
            name: 'ROBUSTA ZILI',
            price: 220000,
            image_url: 'https://zili.sgp1.digitaloceanspaces.com/files/images/bd58fac6-ed58-45e4-a594-22010b4fd4de/blend-zili-coaster.webp',
            product_slug: 'ca-phe-blend-zili-coffee'
        }
    }
]

const SocialMedia = () => {
    const { t } = useLanguage()
    const [isShowModal, setIsShowModal] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)

    const handleShowModal = (index: number) => {
        setActiveIndex(index)
        setIsShowModal(true)
    }

    const handleCloseModal = () => {
        setActiveIndex(-1)
        setIsShowModal(false)
    }

    return (
        <>
            <div className="w-full lg:mt-[85px] mt-[27px] bg-primary-light text-center">
                <h3 className="uppercase lg:text-[23px] text-[16px] text-primary font-[600] lg:pt-[48px] pt-[26px]">{t.followUsOnSocialMedia}</h3>
                <div className="w-full flex items-center justify-center lg:mt-[16px] mt-[15px]">
                    <SocialItem icon={"/images/icons/ic-instagram.svg"} linkUrl={"/"} />
                    <SocialItem icon={"/images/icons/ic-tiktok.svg"} linkUrl={"/"} />
                    <SocialItem icon={"/images/icons/ic-facebook.svg"} linkUrl={"/"} />
                </div>
                <div className="w-full overflow-hidden lg:pb-[38px] pb-[47px] lg:pt-[46px] pt-[27px]">
                    <div className="scroll-auto-small pb-[10px] max-w-full flex overflow-x-auto px-[10px]">
                        {
                            items && items.length > 0 &&
                            items.map((item, index) => {
                                return (
                                    <div key={index}
                                         onClick={() => handleShowModal(index)}
                                         className="cursor-pointer lg:w-[13.0729166667vw] w-[64.358974359vw] lg:min-w-[13.0729166667vw] min-w-[64.358974359vw] mx-[10px]">
                                        <div className="relative w-full h-0 pt-[100%]">
                                            <Image src={item.image_url || ''}
                                                   layout="fill"
                                                   objectFit="cover"
                                                   priority={true}
                                                   alt="socialImage"/>
                                            {
                                                item.type === MEDIA_TYPE.VIDEO &&
                                                <div className="absolute w-[37px] h-[37px] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                                                    <div className="relative w-full h-0 pt-[100%]">
                                                        <Image src="/images/icons/ic-action.svg"
                                                               layout="fill"
                                                               objectFit="cover"
                                                               priority={true}
                                                               alt="socialImage"/>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <ModalDetail status={isShowModal}
                         onCloseModal={handleCloseModal}
                         items={items}
                         initialIndex={activeIndex} />
        </>
    )
}

export default memo(SocialMedia)
