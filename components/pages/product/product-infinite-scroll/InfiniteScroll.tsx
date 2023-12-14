import React, { memo } from "react"
import { PRODUCT_MODEL } from "models/product.model"
import { UseInfiniteScroll } from "./useInfiniteScroll"
import Loader from "./Loader"
import ProductCard from "components/common/product/product-card"
import ProductNotFound from "components/common/product/product-not-found"

type ProductsProps = Pick<UseInfiniteScroll, "isLoading" | "loadMoreCallback" | "isLastPage"> & {
  products: Array<PRODUCT_MODEL>
}

const InfiniteScroll = ({ products, isLoading, loadMoreCallback, isLastPage }: ProductsProps) => {
  if (!products || products?.length === 0) return <ProductNotFound />
  return (
    <div className="container container-full-phone">
      <div className="w-full flex lg:flex-row flex-col-reverse justify-between mt-[20px]">
        <div className="w-full flex flex-col justify-between lg:pb-[6px] pb-0 overflow-hidden lg:mt-0 mt-[19px]">
          <div className="scroll-auto-small lg:grid grid-cols-4 flex overflow-x-auto lg:gap-[36px] gap-[38px] lg:px-0 px-[20px] py-[20px]">
            {
              products.map((product, index) => {
                  return <ProductCard item={product} key={index} icons={false} />
              })
            }
          </div>
        </div>
      </div>

      <Loader isLoading={isLoading} isLastPage={isLastPage} loadMoreCallback={loadMoreCallback} />
    </div>
  )
}

export default memo(InfiniteScroll)
