import React, {memo} from "react"
import TopInfoSection from "./top-info-section"
import FlavorSection from "./flavor-section"
import OptionSection from "./option-section"
import AddToCartSection from "./add-to-cart-section"

const VariantInfo = () => {

    return (
        <div className="w-full lg:pl-[73px] pl-0 flex flex-col justify-between lg:mt-0 mt-[29px]">
            <div className="mb-[25px]">
                <TopInfoSection />
                <FlavorSection />
                <OptionSection />
            </div>
            <AddToCartSection />
        </div>
    )
}

export default memo(VariantInfo)
