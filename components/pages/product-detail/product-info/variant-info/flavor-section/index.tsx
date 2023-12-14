import React from "react"
import {useLanguage} from "hooks/useLanguage"
import FlavorItem from "./flavor-item"
const FlavorSection = () => {
    const { t, locale } = useLanguage()

    return (
        <div className="lg:mt-[25px] mt-[19px] w-full">
            <h4 className="text-title text-[16px] font-[600]">{t.flavor}</h4>
            <div className="lg:mt-[18px] mt-[12px] flex flex-wrap">
                <FlavorItem />
                <FlavorItem />
            </div>
        </div>
    )
}

export default FlavorSection