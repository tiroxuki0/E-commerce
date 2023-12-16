import React, { memo } from "react"
import Card from "./card"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, EffectCoverflow, Pagination, A11y, Autoplay } from "swiper"

import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"
import "swiper/css/navigation"

const ListCard = () => {
  const products: any = [
    {
      imageURL: "/cards/the-viettel.png",
      title: "Viettel"
    },
    {
      imageURL: "/cards/the-vinaphone.jpeg",
      title: "Vinaphone"
    },
    {
      imageURL: "/cards/the-mobifone.jpeg",
      title: "Mobifone"
    },
    {
      imageURL: "/cards/the-vietnamobile.jpeg",
      title: "Vietnamobile"
    },
    {
      imageURL: "/cards/the-gmobile.jpg",
      title: "Gmobile"
    },
    {
      imageURL: "/cards/the-garena.png",
      title: "Garena"
    },
    {
      imageURL: "/cards/the-zing.png",
      title: "Zing"
    },
    {
      imageURL: "/cards/the-vcoin.png",
      title: "Vcoin"
    },
    {
      imageURL: "/cards/the-gate.png",
      title: "Gate"
    },
    {
      imageURL: "/cards/the-viettel.png",
      title: "Viettel"
    },
    {
      imageURL: "/cards/the-vinaphone.jpeg",
      title: "Vinaphone"
    },
    {
      imageURL: "/cards/the-mobifone.jpeg",
      title: "Mobifone"
    },
    {
      imageURL: "/cards/the-vietnamobile.jpeg",
      title: "Vietnamobile"
    },
    {
      imageURL: "/cards/the-gmobile.jpg",
      title: "Gmobile"
    },
    {
      imageURL: "/cards/the-garena.png",
      title: "Garena"
    },
    {
      imageURL: "/cards/the-zing.png",
      title: "Zing"
    },
    {
      imageURL: "/cards/the-vcoin.png",
      title: "Vcoin"
    },
    {
      imageURL: "/cards/the-gate.png",
      title: "Gate"
    }
  ]

  return (
    <>
      <div className="Frame5267 container">
        <div className="w-full font-bold text-[20px] mx-auto mt-[40px] text-center">Đổi thẻ cào</div>
        <div className="w-full flex flex-col items-start justify-start gap-[10px]">
          <div className="text-left text-[14px] mt-[10px]">
            Các loại thẻ cào điện thoại, thẻ game trực tuyến, hỗ trợ thanh toán bằng ví điện tử, các ngân hàng của Việt Nam, thẻ Visa/Master. Sau khi thanh toán thành công, thẻ sẽ đc trả ngay lập tức
            trên website và gửi vào điạ chỉ email của bạn.
          </div>
        </div>
      </div>
      <div className="Frame5276 w-full h-auto relative">
        {/* <div className="Group1000000798 w-full h-auto items-center gap-5 justify-center flex-wrap md:flex hidden">
          {products?.map((item: any, index: number) => {
            return <Card key={index} data={item} />
          })}
        </div> */}
        <div className="Group1000000798 mt-3 w-full h-auto items-center gap-5 justify-center flex-wrap ">
          <div className="Frame5341 w-full relative">
            <Swiper
              className="Group1000000803 w-full flex items-center justify-center gap-[40px] overflow-x-auto overflow-y-hidden cards-slide"
              modules={[Navigation, EffectCoverflow, Pagination, A11y, Autoplay]}
              loop={true}
              speed={400}
              navigation={true}
              spaceBetween={0}
              slidesPerView={"auto"}
              pagination={{ clickable: true }}
              effect={"coverflow"}
              centeredSlides={true}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 60,
                modifier: 3,
                slideShadows: false
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false
              }}
              breakpoints={{
                368: {
                  slidesPerView: 3,
                  spaceBetween: 0
                },
                768: {
                  slidesPerView: 5,
                  spaceBetween: 0
                },
                992: {
                  slidesPerView: 5,
                  spaceBetween: 0
                }
              }}
            >
              {products?.map((item: any, index: number) => {
                return (
                  <SwiperSlide key={index} className="h-auto">
                    <Card data={item} />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(ListCard)
