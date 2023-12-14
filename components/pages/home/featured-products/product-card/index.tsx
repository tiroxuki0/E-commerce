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
        <div className="w-full text-center">
            <div className="w-full product-image overflow-hidden">
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
            <div className="flex items-center justify-center lg:mt-[16px] mt-[6px]">
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
                <a>
                    <h5 className="text-[12px] truncate lg:text-[16px] lg:mt-[20px] mt-[9px] font-[500] leading-[1.25] uppercase text-primary">{item.name_display || ''}</h5>
                </a>
            </Link>
            <h4 className="text-[16px] lg:text-[23px] lg:mt-[20px] mt-[9px] font-[700]">{formatCurrency(item.price || 0) || ''}</h4>
            <ButtonCustom className="lg:mt-[20px] mt-[9px] mx-auto"
                          title={t.buyNow}
                          linkUrl={`/product/${item.product_slug}`}/>
        </div>
    )
}

export default memo(ProductCard)
