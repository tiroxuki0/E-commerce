import React, { memo } from "react"
import Image from "next/image"
import { replaceUrlImage } from "helpers/base.helper"
import { formatCurrency } from "helpers/currency-format.helper"
import ButtonCustom from "components/common/button"
import { useLanguage } from "hooks/useLanguage"
import { PRODUCT_MODEL, PRODUCT_MEDIA_MODEL } from "models/product.model"
import Link from "next/link"
import styled from "styled-components"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper"

import "swiper/swiper-bundle.css"

const ProductWrapper = styled.div`
  .swiper-pagination-bullet {
    background: #898989 !important;
  }
  .swiper-pagination-bullet-active {
    background: #346448 !important;
  }
  .swiper {
    background: #f4f4f4;
    border-radius: 8px;
    margin-top: 3px;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
  }

  .swiper-button-prev,
  .swiper-button-next {
    top: 50%;
    transform: translateY(-50%);
    margin-top: 0 !important;
    width: 25px !important;
    height: 25px !important;
    border-radius: 100rem;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
    &:after {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      content: "icon" !important;
      color: #346448 !important;
      transform: translateX(10%);
    }
  }
  .swiper-button-prev {
    &:after {
      background: url("/images/icons/slide-prev.svg") 0 no-repeat;
    }
  }
  .swiper-button-next {
    &:after {
      transform: translateX(15%);
      background: url("/images/icons/slide-next.svg") 0 no-repeat;
    }
  }
`

const ProductImageWrapper = styled.div`
  &:hover {
    .image-inner {
      transform: scale(1.1);
      transition: transform ease 0.3s;
    }
  }
  .image-inner {
    transition: transform ease 0.3s;
  }
`

const ProductCard = ({ item, icons, widthFull }: { item: PRODUCT_MODEL; icons: boolean, widthFull?: boolean }) => {
  const { t } = useLanguage()

  return (
    <ProductWrapper className={`${widthFull ? 'w-full' : 'w-[56.9230769231%] min-w-[222px]'} lg:w-full`}>
      {
          (item.product_media && item.product_media?.length > 0) &&
          <Link href={`/product/${item.product_slug}`}>
              <a className="link w-full h-full cursor-auto">
                  <Swiper
                      navigation={item.product_media.length > 1}
                      pagination={{ clickable: true }}
                      slidesPerView={1}
                      slidesPerGroup={1}
                      spaceBetween={20}
                      keyboard={{
                          enabled: true
                      }}
                      allowSlidePrev={item.product_media.length > 1}
                      allowSlideNext={item.product_media.length > 1}
                      modules={[Navigation, Pagination]}
                  >
                      {item.product_media.map((item: PRODUCT_MEDIA_MODEL, index: number) => {
                          return (
                              <SwiperSlide key={index}>
                                  <ProductImageWrapper className="px-[30px] py-[30px] lg:px-[80px] lg:py-[50px] rounded-[8px]">
                                      <div className="image-inner w-full h-0 pt-[100%] relative overflow-hidden">
                                          <Image src={replaceUrlImage(item.url) || ""} objectFit="contain" priority={true} alt="media" layout="fill" />
                                      </div>
                                  </ProductImageWrapper>
                              </SwiperSlide>
                          )
                      })}
                  </Swiper>
              </a>
          </Link>
      }
      {icons && (
        <div className="flex items-center lg:mt-[16px] mt-[20px]">
          <div className="mr-[16px] w-[37px] h-[24px] lg:w-[62px] lg:h-[41px] relative">
            <Image src="/images/product-img/item-1.png" objectFit="cover" priority={true} layout="fill" alt="media" />
          </div>
          <div className="w-[37px] h-[24px] lg:w-[62px] lg:h-[41px] relative">
            <Image src="/images/product-img/item-2.png" objectFit="cover" priority={true} layout="fill" alt="media" />
          </div>
        </div>
      )}
      <Link href={`/product/${item.product_slug}`}>
        <a className="block text-[12px] truncate lg:text-[16px] lg:mt-[20px] mt-[9px] font-[500] leading-[1.25] uppercase text-primary">{item.name_display || ""}</a>
      </Link>
      <h4 className="text-[16px] lg:text-[23px] lg:mt-[20px] mt-[9px] font-[700]">{formatCurrency(item.price || 0) || ""}</h4>
      <div className="flex justify-start lg:mt-[20px] mt-[9px]">
        <ButtonCustom className="mr-[13px] btn-on-phone" title={t.quickView} linkUrl={`/product/${item.product_slug}`} />
        <ButtonCustom title={t.buyNow} className="px-[15px] btn-on-phone" linkUrl={`/product/${item.product_slug}`} />
      </div>
    </ProductWrapper>
  )
}

export default memo(ProductCard)
