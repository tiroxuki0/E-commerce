import React from "react"
import {usePageComponent} from "stores/page-component"
import {Autoplay, Navigation, Pagination} from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { replaceUrlImage } from "helpers/base.helper"
import { useRouter } from "next/router"
import Image from 'next/image'

import "swiper/swiper-bundle.css"

interface Props {
  isMobile: boolean
}

const BannerTop = (props: Props) => {
  const [storePageComponent] = usePageComponent()
  const bannerList = storePageComponent.pageComponent.bannersTop
  const router = useRouter()

  const handleClickBanner = (link_url?: string) => {
    if (link_url) {
      router.push(link_url)
    }
  }

  return (
    <div className="w-full banner-top relative">
      {
        bannerList && bannerList.length > 0 &&
        <Swiper slidesPerView={1}
                spaceBetween={20}
                keyboard={{
                  enabled: true
                }}
                allowSlidePrev={bannerList?.length > 1}
                allowSlideNext={bannerList?.length > 1}
                autoplay={{
                  delay: 3000
                }}
                speed={800}
                loop={true}
                pagination={bannerList?.length > 1}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1
                  }
                }}
                modules={[Navigation, Autoplay, Pagination]}
        >
          {
            bannerList?.map((item, index) => {
              if (props.isMobile) {
                if (item?.mobile_url) {
                  return (
                      <SwiperSlide key={index} className='w-full relative' onClick={() => handleClickBanner(item.link_url)}>
                        <Image src={replaceUrlImage(item.mobile_url)}
                               objectFit="cover"
                               priority={true}
                               alt="media"
                               layout='fill'/>
                      </SwiperSlide>
                  )
                } else return ''
              } else {
                if (item?.desktop_url) {
                  return (
                      <SwiperSlide key={index} className='w-full relative' onClick={() => handleClickBanner(item.link_url)}>
                        <Image src={replaceUrlImage(item.desktop_url)}
                               objectFit="cover"
                               priority={true}
                               alt="media"
                               layout='fill'/>
                      </SwiperSlide>
                  )
                } else return ''
              }
            })
          }
        </Swiper>
      }
    </div>
  )
}

export default BannerTop
