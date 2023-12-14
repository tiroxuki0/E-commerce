import React, {Fragment} from "react"
import {IoStar} from "react-icons/io5"
import {useRouter} from "next/router"
import ButtonCustom from "components/common/button"
import {useLanguage} from "hooks/useLanguage"
import {useProductReview} from "stores/product-review"
import {useProduct} from "stores/product"
const ReviewInfo = () => {
    const {t} = useLanguage()
    const [storeReview] = useProductReview()
    const [storeProduct] = useProduct()
    const router = useRouter()

    const handleReviewProduct = () => {
        router.push(`/product/review?product=${storeProduct.product?.product_slug || ""}`).then()
    }

    return (
        <div className="lg:flex items-center mt-[58px] w-full justify-between">
            <div className="lg:w-[35.4861111111%] w-full">
                <div className="grid grid-cols-[36px_1fr_auto] items-center gap-x-[16px]">
                    {
                        Array.from(Array(5).keys()).map(index => {
                            const totalStar = storeReview.reviewsByProduct?.[`totalStar${5 - index}`]
                            return (
                                <Fragment key={index}>
                                    <div className="grid grid-cols-[16px_20px] items-center">
                                        <span className="font-[500] lg:text-[16px] text-[14px] text-review">{5 - index}</span>
                                        <IoStar className="my-[6px]" size={18} color={totalStar > 0 ? "var(--color-star)" : "var(--color-text-review)"}/>
                                    </div>
                                    <div className="relative lg:h-[14px] h-[10px] lg:rounded-[19px] rounded-[13px] overflow-hidden bg-review">
                                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-review-active lg:rounded-[19px] rounded-[13px]" style={{width: `${storeReview.reviewsByProduct?.total > 0 ? totalStar/storeReview.reviewsByProduct?.total*100 : 0}%`}}/>
                                    </div>
                                    <span className="text-review text-end">{totalStar}</span>
                                </Fragment>
                            )
                        })
                    }
                </div>
            </div>
            <ButtonCustom title={t.writeReview}
                          className="btn-primary lg:mt-[0] mt-[16px] ml-auto"
                          onClick={handleReviewProduct}
                          linkUrl="" />
        </div>
    )
}

export default ReviewInfo
