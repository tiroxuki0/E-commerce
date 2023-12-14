import React from "react"
import {PRODUCT_VARIANT_MODEL} from "models/product.model"
import {PRODUCT_OPTION_TYPE} from "constants/product.constant"

interface Props {
    title: string
    options: Array<any>
    optionType: string
    handleOptionSelected: (optionType: string, selectOption: any) => void
    selectedVariant: PRODUCT_VARIANT_MODEL
}

const OptionItem = ({
    title = "",
    options = [],
    optionType = PRODUCT_OPTION_TYPE.TYPE1,
    handleOptionSelected,
    selectedVariant
}: Props) => {

    if (!options || options.length === 0) return <></>

    return (
        <div className="w-full mt-[17.5px]">
            <h4 className="text-title text-[16px] font-[600]">{title}</h4>
            <div className="flex flex-wrap">
                {
                    options.map((option, index) => {
                        return (
                            <div className={`${option.isDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} 
                            ${option.value === selectedVariant[optionType] ? "border-primary bg-primary text-white" : "text-black text-opacity-60 bg-item"} 
                            mr-[15px] my-[7.5px] px-[15px] py-[12px] text-[14px] rounded-[5px] flex items-center justify-center overflow-hidden`}
                                 onClick={() => handleOptionSelected(optionType, option)}
                                 key={index}
                            >
                                {option.value || ""}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default OptionItem
