import React, { memo } from "react"
import Image from "next/image"
import ProductCard from "components/common/product/product-card"
import { useLanguage } from "hooks/useLanguage"
import {useProduct} from "stores/product"
import {usePageComponent} from "stores/page-component"
import {replaceUrlImage} from "helpers/base.helper"

const ProductList = () => {
  const { t } = useLanguage()
  const [storeProduct] = useProduct()
  const [storePageComponent] = usePageComponent()

  if (!storeProduct.products || storeProduct.products.length === 0) return <></>

  return (
    <div className="lg:mt-[66px] my-[60px]">
      <div className="container container-full-phone">
        <h3 className="text-primary lg:px-0 px-[20px] lg:text-[23px] text-[16px] font-[600] uppercase text-center">{t.youMightLikeThis}</h3>
        <div className="w-full lg:px-0 px-[10px] flex flex-wrap justify-between lg:pb-[6px] pb-0 overflow-hidden lg:mt-[49px] mt-[22px]">
          {
            storePageComponent.pageComponent?.bannerProductMore?.image_url &&
              <div className="lg:w-[31.25%] w-full lg:mx-0 mx-[10px] overflow-hidden">
                <div className="relative h-0 w-full pt-[100%]">
                  <Image src={replaceUrlImage(storePageComponent.pageComponent?.bannerProductMore?.image_url)}
                         layout="fill"
                         objectFit="cover"
                         alt={storePageComponent.pageComponent?.bannerProductMore?.image_url}/>
                </div>
              </div>
          }
          {
            storeProduct.products.map((product, index) => {
              return (
                  <div key={index} className="lg:w-[20.8333333333%] w-[50%] lg:p-0 p-[10px]">
                    <ProductCard widthFull item={product} icons={true} />
                  </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default memo(ProductList)
