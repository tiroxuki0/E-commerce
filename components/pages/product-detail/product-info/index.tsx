import React, {memo} from "react"
import VariantMedia from "./variant-media"
import VariantInfo from "./variant-info"

const ProductInfo = () => {

    return (
        <div className="container lg:pt-[36px] pt-[15px]"
             id="productInfoContainer"
        >
            <div className="lg:flex relative justify-between lg:px-[155px] px-0 w-full productCardWrapperJs">
                <VariantMedia />
                <VariantInfo />
            </div>
        </div>
    )
}

export default memo(ProductInfo)
