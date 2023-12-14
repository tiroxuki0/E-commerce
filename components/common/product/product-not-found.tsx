import React from "react"
import { useLanguage } from "hooks/useLanguage"

const ProductNotFound = () => {
    const {t} = useLanguage()

    return (
        <p className="text-center my-[50px]">{t.productNotFound}</p>
    )
}

export default ProductNotFound
