import React, {memo} from "react"
import {useLanguage} from "hooks/useLanguage"
import ReviewInfo from "./review-info"
import ReviewList from "./review-list"

const ProductReview = () => {
    const {t} = useLanguage()

    return (
        <div className="container lg:pt-[60px] pt-[39px]">
            <h4 className="text-center lgtext-[23px] text-[16px] font-[600] text-title uppercase">{t.customerReviews}</h4>
            <ReviewInfo />
            <ReviewList />
        </div>
    )
}

export default memo(ProductReview)
