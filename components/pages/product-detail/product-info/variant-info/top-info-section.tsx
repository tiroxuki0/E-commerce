import React from "react"
import {useLanguage} from "hooks/useLanguage"
import {useProduct} from "stores/product"
import ProductRatingStar from "components/common/product-rating-star"
import CountDownFlashSale from "components/common/count-down-flash-sale"
import {formatCurrency} from "helpers/currency-format.helper"
import {
    COMBO_SPECIAL_TAG,
    COMBO_TAG,
    COMBO_TYPE,
    DEAL_SHOCK_GIFT_TAG,
    FLASH_SALE_STATUS,
    PRODUCT_DEAL_SHOCK_TYPE
} from "constants/promotion.constant"
import {DEFAULT_LANGUAGE} from "constants/base.constant"

const promotionTagClass = 'border-price-active lg:px-[6px] lg:py-[4px] px-[7px] py-[5px] text-[12px] leading-[1] w-fit text-price-active mt-[10px] rounded-[3px] lg:font-[500] font-[600]'

const TopInfoSection = () => {
    const { t, locale } = useLanguage()
    const [storeProduct] = useProduct()
    const flashSalePromotionPrice = 0

    const renderOtherPromotions = () => {
        const promotions = storeProduct.promotions
        if (storeProduct.promotions) {
            if (promotions.deal_shock) {
                if (promotions.deal_shock.type === PRODUCT_DEAL_SHOCK_TYPE.buy_with_shock_deal_discount) {
                    return <p className={promotionTagClass}>{t.buyTogetherWithAShockDeal}</p>
                } else if (promotions.deal_shock.type === PRODUCT_DEAL_SHOCK_TYPE.buy_with_shock_deal_gift) {
                    if (promotions.deal_shock.base_price > 0) {
                        return <p className={promotionTagClass}>{t.buyToGetAGift}</p>
                    } else if (promotions?.deal_shock?.quantity_limit > 0) {
                        return <p className={promotionTagClass}>{DEAL_SHOCK_GIFT_TAG[locale || DEFAULT_LANGUAGE](promotions?.deal_shock?.quantity_limit, promotions?.deal_shock?.gift_limit)}</p>
                    }
                }
            } else {
                if (promotions.combo) {
                    if (promotions.combo.sub_type === COMBO_TYPE.DISCOUNT_WITH_RATE) {
                        return <p className={promotionTagClass}>{COMBO_TAG[locale || DEFAULT_LANGUAGE](promotions?.combo.quantity, `${promotions?.combo.rate}%`)}</p>
                    } else if (promotions.combo.sub_type === COMBO_TYPE.DISCOUNT_WITH_PRICE) {
                        return <p className={promotionTagClass}>{COMBO_TAG[locale || DEFAULT_LANGUAGE](promotions?.combo.quantity, formatCurrency(promotions.combo.value || 0))}</p>
                    } else if (promotions.combo.sub_type === COMBO_TYPE.DISCOUNT_SPECIAL) {
                        return <p className={promotionTagClass}>{COMBO_SPECIAL_TAG[locale || DEFAULT_LANGUAGE](promotions?.combo.quantity, formatCurrency(promotions.combo.value || 0))}</p>
                    }
                }
            }
        }
    }

    return (
        <>
            <div className="w-full">
                <h2 className="text-title lg:text-[18px] text-[16px] uppercase font-[600]">{storeProduct.product?.name_display || storeProduct.product?.short_name || storeProduct.product?.name}</h2>
                {/*<ProductRatingStar avgStar={0}*/}
                {/*                   size={15}*/}
                {/*                   className="pt-[10px]"*/}
                {/*                   numberClassName="text-[12px]"*/}
                {/*                   totalReview={0}*/}
                {/*                   totalSale={storeProduct.product.total_sales || 0}*/}
                {/*/>*/}
                {
                    !storeProduct.promotions?.flash_sale?.id &&
                    <>
                        <div className="flex items-center lg:mt-[20px] mt-[14px]">
                            <div className="flex items-baseline">
                                {
                                    (storeProduct.product?.percent_promotion_display && storeProduct.product?.price_display) &&
                                    storeProduct.product.percent_promotion_display > 0 &&
                                    <p className="lg:text-[18px] text-[16px] leading-[1] text-black mt-0 pr-[9px] lg:pr-[4px] line-through">{formatCurrency(storeProduct.product.price_display)}</p>
                                }
                                <p className="font-[700] lg:text-[25px] text-[23px] leading-[1] text-price-active mt-0">{(storeProduct.product.percent_promotion_display && storeProduct.product.percent_promotion_display > 0) ? storeProduct.product.price_promotion_display : formatCurrency(storeProduct.product.price_display || 0)}</p>
                            </div>
                            {
                                (storeProduct.product?.percent_promotion_display || 0) > 0 &&
                                <p className="text-[13px] leading-[1] text-price-active border-price-active py-[3px] px-[6px] w-fit bg-white ml-[7px] mt-0 rounded-[2px]">{storeProduct.product.percent_promotion_display}%</p>
                            }
                        </div>
                        {
                            renderOtherPromotions()
                        }
                    </>
                }
            </div>
            {
                storeProduct.promotions.flash_sale && (storeProduct.promotions.flash_sale.status === FLASH_SALE_STATUS.HAPPENING || storeProduct.promotions.flash_sale.status === FLASH_SALE_STATUS.UPCOMING) &&
                <div className="mt-[13px] lg:mt-[16px]">
                    <div className="relative w-full py-[9px] lg:pl-[6px] lg:pr-[11px] bg-[#f54550] lg:block flex justify-between px-[6px]">
                        <div className="flex items-center">
                            <span className="text-[14px] lg:text-[16px] uppercase leading-[2] text-white">{t.shockingPrice}</span>
                            <img className="lg:w-[26px] lg:h-[26px] object-contain w-[23px] h-[23px]" src="/images/img-sale-white.png" alt="flashSale icon"/>
                            <span className="text-[14px] lg:text-[16px] uppercase leading-[2] text-white">{t.today}</span>
                        </div>
                        <CountDownFlashSale flashSale={storeProduct.promotions.flash_sale}
                                            className="absolute items-center top-1/2 right-[11px] -translate-y-1/2 text-white text-[11px]"/>
                    </div>
                    <div className="lg:px-[16px] pb-[14px] px-[10px] bg-[#F5F5F5] flex justify-between">
                        <div className="flex items-center lg:mt-[20px] mt-[14px]">
                            <div className="flex items-baseline">
                                {
                                    flashSalePromotionPrice > 0 &&
                                    <p className="lg:text-[18px] text-[16px] leading-[1] text-black mt-0 pr-[9px] lg:pr-[4px] line-through">{formatCurrency(storeProduct.product.price_display || 0)}</p>
                                }
                                <p className="font-[700] lg:text-[25px] text-[23px] leading-[1] text-price-active mt-0">
                                    {
                                        Math.round((flashSalePromotionPrice / (storeProduct.product.price_display || 0)) * 100) >= (storeProduct.product.percent_promotion_display || 0)
                                            ? formatCurrency((storeProduct.product.price_display || 0) - flashSalePromotionPrice)
                                            : storeProduct.product.price_promotion_display
                                    }
                                </p>
                            </div>
                            {
                                flashSalePromotionPrice > 0 &&
                                <p className="text-[13px] leading-[1] text-price-active border-price-active py-[3px] px-[6px] w-fit bg-white ml-[7px] mt-0 rounded-[2px]">{Math.round((flashSalePromotionPrice / (storeProduct.product.price_display || 0)) * 100)}%</p>
                            }
                        </div>
                        {
                            storeProduct.promotions.flash_sale.status !== FLASH_SALE_STATUS.HAPPENING && renderOtherPromotions()
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default TopInfoSection