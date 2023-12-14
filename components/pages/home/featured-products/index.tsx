import React, {memo} from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation} from "swiper"
import {useLanguage} from "hooks/useLanguage"
import ProductCard from "components/pages/home/featured-products/product-card"
import {usePageComponent} from "stores/page-component"
import {useProduct} from "stores/product"
import Link from "next/link"
import Image from "next/image"

import "swiper/swiper-bundle.css"

const LIMIT = 3
const LIMIT_ON_PHONE = 2

const FeaturedProducts = () => {
    const { t } = useLanguage()
    const [storePageComponent] = usePageComponent()
    const [storeProduct] = useProduct()
    const products = storeProduct.productsBest

    return (
        <div className="w-full featured-products">
            <h2 className="title-custom mt-[23px] mb-[11px] lg:mt-[52px] lg:mb-[48px]">{(storePageComponent.pageComponent.itemProductBest && storePageComponent.pageComponent.itemProductBest.title) ? storePageComponent.pageComponent.itemProductBest.title : t.maybeYouWantToKnow}</h2>
            <div className="container container-full-phone">
                {
                    products && products.length > 0 &&
                    <Swiper slidesPerView={LIMIT}
                            slidesPerGroup={1}
                            spaceBetween="12%"
                            keyboard={{
                                enabled: true
                            }}
                            allowSlidePrev={products?.length > LIMIT}
                            allowSlideNext={products?.length > LIMIT}
                            breakpoints={{
                                770: {
                                    slidesPerView: LIMIT,
                                    spaceBetween: "12%",
                                    allowSlidePrev: products?.length > LIMIT,
                                    allowSlideNext: products?.length > LIMIT,
                                    centeredSlides: false
                                },
                                320: {
                                    slidesPerView: 'auto',
                                    spaceBetween: 20,
                                    allowSlidePrev: products?.length > LIMIT_ON_PHONE,
                                    allowSlideNext: products?.length > LIMIT_ON_PHONE,
                                    centeredSlides: true,
                                    centeredSlidesBounds: true
                                }
                            }}
                            modules={[Navigation]}
                    >
                        {
                            products?.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <ProductCard item={item}/>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                }
            </div>
            <Link href={'/product'}>
                <a className="w-fit text-primary flex items-center justify-center mx-auto lg:mt-[79px] mt-[38px] lg:text-[16px] text-[14px]">
                    {t.viewAllProduct}
                    <span className="block w-[24px] h-[24px] relative">
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

export default memo(FeaturedProducts)
