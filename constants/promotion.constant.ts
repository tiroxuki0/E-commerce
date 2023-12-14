export enum FLASH_SALE_STATUS {
  HAPPENING = 'happening',
  UPCOMING = 'upcoming',
  UN_ACTIVE = 'unActive'
}

export enum PRODUCT_DEAL_SHOCK_TYPE {
  buy_with_shock_deal_discount = 'buy_with_shock_deal_discount',
  buy_with_shock_deal_gift = 'buy_with_shock_deal_gift',
  promotion_combo = 'combo'
}

export enum PRODUCT_PROMOTION {
  deal_shock = 'deal_shock',
  combo = 'combo',
  sale_off = 'sale_off',
  flash_sale = 'flash_sale'
}

export const DEAL_SHOCK_GIFT_TAG = (quantityLimit: number, giftLimit: number) => ({
  vi: `Mua ${quantityLimit} tặng ${giftLimit}`,
  en: `Buy ${quantityLimit} and receive ${giftLimit} as a gift`
})

export const COMBO_TAG = (quantity: number, discount: string) => ({
  vi: `Mua ${quantity} & giảm ${discount}`,
  en: `Buy ${quantity} & get ${discount} off`
})

export const COMBO_SPECIAL_TAG = (quantity: number, discount: string) => ({
  vi: `Mua ${quantity} với giá ${discount}`,
  en: `Buy ${quantity} at ${discount}`
})

export enum COMBO_TYPE {
  DISCOUNT_WITH_RATE = 1,
  DISCOUNT_WITH_PRICE = 2,
  DISCOUNT_SPECIAL = 3
}