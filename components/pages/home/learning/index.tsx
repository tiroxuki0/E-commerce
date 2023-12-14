import React, {memo} from "react"
import {useLanguage} from "hooks/useLanguage"
import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './product-card'
import {useProduct} from "stores/product"
import {usePageComponent} from "stores/page-component"
import {replaceUrlImage} from "helpers/base.helper"

const Learning = ({isMobile = false}: {isMobile: boolean}) => {
    const { t } = useLanguage()
    const [storeProduct] = useProduct()
    const [storePageComponent] = usePageComponent()
    const products = storeProduct.productsIntroduce

    return (
        <div className="lg:mt-[66px] my-[37px]">
            <div className="container container-full-phone">
                <h3 className="text-primary lg:px-0 px-[20px] lg:text-[23px] text-[16px] font-[600] uppercase text-center">{storePageComponent.pageComponent?.itemProductIntroduce?.title || t.learn}</h3>
                <div className="w-full flex lg:flex-row flex-col-reverse justify-between lg:mt-[55px] mt-[28px]">
                    <div className="lg:w-[53.6111111111%] w-full flex flex-col justify-between lg:pb-[6px] pb-0 overflow-hidden lg:mt-0 mt-[19px]">
                        <div className="scroll-auto-small lg:grid grid-cols-2 flex overflow-x-auto lg:gap-[36px] gap-[38px] lg:px-0 px-[20px] lg:pb-0 pb-[10px]">
                            {
                                products && products.length > 0 &&
                                products.slice(0, 2).map((product, index) => {
                                    return <ProductCard item={product} key={index}/>
                                })
                            }
                        </div>
                        <Link href="/product">
                            <a className="w-fit text-primary flex items-center justify-center mx-auto lg:mt-0 mt-[38px] lg:text-[16px] text-[14px]">
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
                    <div className="lg:w-[42.4305555556%] w-full lg:px-0 px-[20px]">
                        <div className="w-full h-0 pt-[109.328968903%] relative">
                            {
                                (storePageComponent.pageComponent?.itemProductIntroduce?.desktop_url || storePageComponent.pageComponent?.itemProductIntroduce?.mobile_url) &&
                                <video className="w-full h-full absolute top-0 left-0 right-0 bottom-0 object-cover"
                                       controls
                                       src={replaceUrlImage((isMobile ? storePageComponent.pageComponent.itemProductIntroduce.desktop_url : storePageComponent.pageComponent.itemProductIntroduce.mobile_url) || '')} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Learning)
