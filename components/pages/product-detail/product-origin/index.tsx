import React, {memo} from "react"
import {useLanguage} from "hooks/useLanguage"
import Image from "next/image"
import Item from "./item"

const ProductOrigin = () => {
    const {t} = useLanguage()

    return (
        <div className="w-full bg-primary-lighter mt-[58px] lg:py-[73px] py-[32px]">
            <div className="container lg:px-[34px] px-[20px] lg:flex items-center">
                <div className="relative lg:w-[45%] lg:min-w-[45%] w-full min-w-full">
                    <div className="h-0 pt-[77.743902439%]" />
                    <Image src="/images/product-img/img-map.png"
                           layout="fill"
                           objectFit="cover"
                    />
                </div>
                <div className="lg:pl-[159px] lg:mt-0 mt-[41px]">
                    <div className="grid grid-cols-2 lg:gap-y-[59px] lg:gap-x-[81px] gap-y-[31px] gap-x-[36px]">
                        <Item imageUrl="/images/icons/product-detail/ic-map.svg"
                              title={t.origin}
                              content="Cầu Đất - Lâm Đồng"
                              className="lg:w-[42px] lg:min-w-[42px] lg:h-[42px] min-w-[33px] w-[33px] h-[33px]"
                              key={1}
                        />
                        <Item imageUrl="/images/icons/product-detail/ic-mountains.svg"
                              title={t.elevation}
                              content="1515 - 1560m"
                              className="lg:w-[48px] lg:min-w-[48px] lg:h-[51px] min-w-[37px] w-[37px] h-[40px]"
                              key={2}
                        />
                        <Item imageUrl="/images/icons/product-detail/ic-type.svg"
                              title={t.typeOfBeans}
                              content="Arabica Blend"
                              className="lg:w-[83px] lg:min-w-[83px] lg:h-[41px] min-w-[65px] w-[65px] h-[32px]"
                              key={3}
                        />
                        <Item imageUrl="/images/icons/product-detail/ic-repeat.svg"
                              title={t.processingMethod}
                              content="Natural"
                              className="lg:w-[41px] lg:min-w-[41px] lg:h-[42px] min-w-[32px] w-[32px] h-[33px]"
                              key={4}
                        />
                    </div>
                    <p className="text-primary font-[500] lg:text-[16px] text-[14px] lg:mt-[32px] mt-[24px]">{"Cà phê rang xay nguyên chất Zili được để nguyên hạt hoặc xay theo các mức pha phin, pha máy."}</p>
                </div>
            </div>
        </div>
    )
}

export default memo(ProductOrigin)
