import React from "react"
import { usePageComponent } from "stores/page-component"
import { Autoplay, Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/swiper-bundle.css"

interface Props {
  isMobile: boolean
}

const BannerTop = (props: Props) => {
  const [storePageComponent] = usePageComponent()
  // const bannerList = storePageComponent.pageComponent.bannersTop
  const bannerList = [
    {
      title: "Rút tiền, nạp tiền tự động",
      description: "Ưu đãi rút tiền nạp tiền tự động. Hỗ trợ rút tiền về tất cả các ngân hàng và ví điện tử Momo miễn phí. Hỗ trợ rút tiền 24/7",
      image_url: "/images/banner_code.png"
    },
    {
      title: "Đổi thẻ cào",
      description: "Đổi thẻ cào mạng di động, thẻ game chiết khấu tốt nhất trên thị trường. Đổi thẻ cào tự động, nhanh chóng.",
      image_url: "/images/banner_code.png"
    },
    {
      title: "Tích hợp API",
      description: "Hệ thống cung cấp và xử lý API Nạp Thẻ Cào cho các shop game, shop online v.v. Cam kết ổn định trong suốt quá trình sử dụng hệ thống.",
      image_url: "/images/banner_code.png"
    }
  ]
  // const router = useRouter()

  /* const handleClickBanner = (link_url?: string) => {
    if (link_url) {
      router.push(link_url)
    }
  } */

  return (
    <div className="w-full bg-[#346448] relative">
      {bannerList && bannerList.length > 0 && (
        <Swiper
          slidesPerView={1}
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
          navigation={true}
          pagination={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              slidesPerGroup: 1
            }
          }}
          modules={[Navigation, Autoplay, Pagination]}
        >
          {bannerList?.map((item, index) => {
            return (
              <SwiperSlide key={index} className="w-full relative" /* onClick={() => handleClickBanner(item.link_url)} */>
                <div className="w-full h-full flex items-center justify-between flex-col-reverse md:flex-row md:gap-[50px] gap-[10px] p-5 md:px-[80px] md:py-[40px]">
                  <div className="w-full flex items-start md:w-1/2 justify-start flex-col">
                    <div className="w-full font-bold text-[30px] text-center md:text-left text-white">{item.title}</div>
                    <div className="w-full text-white text-center md:text-left mt-2">{item.description}</div>
                  </div>
                  <div className="w-1/2 flex items-center justify-center">
                    <Image src={item.image_url} width={350} height={350} objectFit="cover" priority={true} alt="media" />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}
    </div>
  )
}

export default BannerTop
