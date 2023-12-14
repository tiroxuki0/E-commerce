import React, {memo} from "react"
import Image from 'next/image'
import {replaceUrlImage} from "helpers/base.helper"
import {formatCurrency} from "helpers/currency-format.helper"
import ButtonCustom from "components/common/button"
import {useLanguage} from "hooks/useLanguage"
import {PRODUCT_MODEL} from "models/product.model"
import Link from "next/link"

const ProductCard = ({item}: { item: PRODUCT_MODEL }) => {
    const {t} = useLanguage()

    return (
        <div className="lg:w-full w-[56.9230769231%] min-w-[222px]">
            <div className="w-full h-0 pt-[100%] relative overflow-hidden">
                <Link href={`/product/${item.product_slug}`}>
                    <a className="w-full h-full top-0 left-0 right-0 bottom-0 rounded-common absolute">
                        <Image src={replaceUrlImage(item.image_base_url || "") || ''}
                               objectFit="contain"
                               priority={true}
                               alt="media"
                               layout='fill'/>
                    </a>
                </Link>
            </div>
            <div className="flex items-center lg:mt-[16px] mt-[20px]">
                <div className="mr-[16px] w-[37px] h-[24px] lg:w-[62px] lg:h-[41px] relative">
                    <Image src="/images/product-img/item-1.png"
                           objectFit="cover"
                           priority={true}
                           layout='fill'
                           alt="media"
                    />
                </div>
                <div className="w-[37px] h-[24px] lg:w-[62px] lg:h-[41px] relative">
                    <Image src="/images/product-img/item-2.png"
                           objectFit="cover"
                           priority={true}
                           layout='fill'
                           alt="media"
                    />
                </div>
            </div>
            <Link href={`/product/${item.product_slug}`}>
                <a className="block text-[12px] truncate lg:text-[16px] lg:mt-[20px] mt-[9px] font-[500] leading-[1.25] uppercase text-primary">
                    {item.name_display || ''}
                </a>
            </Link>
            <h4 className="text-[16px] lg:text-[23px] lg:mt-[20px] mt-[9px] font-[700]">{formatCurrency(item.price || 0) || ''}</h4>
            <div className="flex justify-start lg:mt-[20px] mt-[9px]">
                <ButtonCustom className="mr-[13px] btn-on-phone"
                              title={t.quickView}
                              linkUrl={`/product/${item.product_slug}`}/>
                <ButtonCustom title={t.buyNow}
                              className="px-[15px] btn-on-phone"
                              linkUrl={`/product/${item.product_slug}`}/>
            </div>
        </div>
    )
}

export default memo(ProductCard)
