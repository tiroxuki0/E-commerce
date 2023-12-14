import React, {memo} from "react"
import {useLanguage} from "hooks/useLanguage"
import StoreItem from './store-item'
import {usePageComponent} from "stores/page-component"

const Stores = () => {
    const { t } = useLanguage()
    const [store] = usePageComponent()

    if (!store.pageComponent.itemHomeStore) return <></>

    return (
        <div className="w-full border-t-primary border-t-[1px] lg:mt-[75px] mt-[43px] lg:pt-[57px] pt-[28px]">
            <div className="container">
                <h3 className="text-primary lg:text-[23px] text-[16px] font-[600] uppercase text-center">{store.pageComponent.itemHomeStore?.title || t.store}</h3>
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[70px] gap-[30px] lg:mt-[44px] mt-[16px]">
                    {
                        (store.pageComponent.itemHomeStore && store.pageComponent.itemHomeStore.item_details) &&
                        store.pageComponent.itemHomeStore.item_details.length > 0 &&
                        store.pageComponent.itemHomeStore.item_details.map((store, index) => {
                            return <StoreItem item={store} key={index}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(Stores)
