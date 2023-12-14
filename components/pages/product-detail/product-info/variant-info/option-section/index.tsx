import React, {useEffect} from "react"
import {useProduct} from "stores/product"
import OptionItem from "./option-item"
import {PRODUCT_OPTION_TYPE} from "constants/product.constant"

const OptionSection = () => {
    const [storeProduct, actionProduct] = useProduct()

    useEffect(() => {
        if (storeProduct.product?.id) {
            actionProduct.setProductOptions(storeProduct.product)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeProduct.product?.id])

    const handleOptionSelected = (optionType: string, selectedOption: any) => {
        actionProduct.handleVariantSelected(optionType, selectedOption)
    }

    return (
        <div className="w-full pt-[7.5px]">
            <OptionItem title={storeProduct.productOptionsCustom?.options1?.label}
                        options={storeProduct.productOptionsCustom?.options1?.values}
                        optionType={PRODUCT_OPTION_TYPE.TYPE1}
                        handleOptionSelected={handleOptionSelected}
                        selectedVariant={storeProduct.selectedVariant}
            />
            <OptionItem title={storeProduct.productOptionsCustom?.options2?.label}
                        options={storeProduct.productOptionsCustom?.options2?.values}
                        optionType={PRODUCT_OPTION_TYPE.TYPE2}
                        handleOptionSelected={handleOptionSelected}
                        selectedVariant={storeProduct.selectedVariant}
            />
            <OptionItem title={storeProduct.productOptionsCustom?.options3?.label}
                        options={storeProduct.productOptionsCustom?.options3?.values}
                        optionType={PRODUCT_OPTION_TYPE.TYPE3}
                        handleOptionSelected={handleOptionSelected}
                        selectedVariant={storeProduct.selectedVariant}
            />
        </div>
    )
}

export default OptionSection
