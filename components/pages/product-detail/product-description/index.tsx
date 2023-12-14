import React, {memo} from "react"
import {useLanguage} from "hooks/useLanguage"
import {useProduct} from "stores/product"
import ContentItem from './content-item'

const ProductDescription = () => {
    const {t} = useLanguage()
    const [storeProduct] = useProduct()

    return (
        <div className="container lg:mt-[92px] mt-[42px]">
            <ContentItem title={t.productDescription}
                         defaultStatus={true}
                         key={1}
                         images={storeProduct.product.product_image_details}
                         description={storeProduct.product.product_description || t.noProductDescriptionAvailable} />
            <ContentItem title={t.purchasePolicy}
                         key={2}
                         description={t.purchasePolicyDescription} />
        </div>
    )
}

export default memo(ProductDescription)
