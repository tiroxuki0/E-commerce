import {FLASH_SALE_STATUS} from "constants/promotion.constant"

export interface PROMOTION_MODEL {
    readonly id: number
}

export interface PROMOTIONS_PRODUCT_MODEL {
    flash_sale?: FLASH_SALE_MODEL,
    deal_shock?: DEAL_SHOCK_MODEL,
    combo?: COMBO_MODEL
}

export interface FLASH_SALE_MODEL {
    readonly id: number
    date_start: string
    time_start: string
    time_end: string,
    flash_sale_items: Array<FLASH_SALE_ITEM_MODEL>
    status: FLASH_SALE_STATUS
    name: string
    timeInfo: {
        content: string
        time_end: any
        time_start: any
    }
}

export interface FLASH_SALE_ITEM_MODEL {
    id?: number
    product_id?: string
    rate?: number
    value?: number
}

export interface DEAL_SHOCK_MODEL {
    readonly id: number
    type: string
    base_price: number
    quantity_limit: number
    gift_limit: number
}

export interface COMBO_MODEL {
    readonly id: number
    sub_type: number
    rate?: number
    value?: number
    quantity: number
}