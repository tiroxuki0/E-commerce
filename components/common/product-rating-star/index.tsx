import React from "react"
import {RatingStar} from "rating-star"

interface Props {
    className?: string
    avgStar: number
    size: number
    totalReview: number
    totalSale: number
    numberClassName?: string
}
const ProductRatingStar: React.FC<Props> = (props) => {

  return (
      <div className={`${props.className || ''} flex items-center`}>
        <RatingStar id="productRating"
                    rating={props.avgStar || 0}
                    size={props.size || 24}/>
        <span className={`text-black font-[500] leading-[1] ${props.numberClassName || ""}`}>({props?.totalReview > 0 ? props.totalReview : 0})</span>
        <hr className="ml-[5px] mr-[6px] border-none w-[1px] bg-black h-[13px]"/>
        <img className="w-[14px] h-[14px] min-w-[14px]" src={"/images/icons/ic-cart.svg"} alt="cartIcon"/>
        <span className={`text-black font-[500] leading-[1] ${props.numberClassName || ""}`}>{props?.totalSale > 0 ? props.totalSale : 0}</span>
      </div>
  )
}

export default ProductRatingStar
