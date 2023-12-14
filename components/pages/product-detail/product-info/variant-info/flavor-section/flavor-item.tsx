import React from "react"
import {PRODUCT_FLAVOR_MODEL} from "models/product.model"
import Image from "next/image"

interface Props {
    item?: PRODUCT_FLAVOR_MODEL
}

const FlavorItem = (props: Props) => {

    return (
        <div className="flex items-center w-1/2 lg:pr-[21px] pr-[12px]">
            <div className="lg:w-[73px] lg:min-w-[73px] lg:h-[48px] w-[59px] h-[39px] min-w-[59px] relative">
                <Image src={"/images/product-img/item-1.png"}
                       layout="fill"
                       objectFit="cover"
                       priority={true}
                       alt="flavorImg"/>
            </div>
            <p className="pl-[5px] text-primary lg:text-[16px] text-[14px] leading-[1.25]">Hương trái cây nhiệt đới</p>
        </div>
    )
}

export default FlavorItem