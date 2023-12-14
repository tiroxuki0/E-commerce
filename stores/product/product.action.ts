import {BaseAction} from ".."
import {State} from "./index"
import {PRODUCT_MODEL, PRODUCT_VARIANT_MODEL} from "models/product.model"
import {FLASH_SALE_MODEL, PROMOTIONS_PRODUCT_MODEL} from "models/promotion.model"
import {getProductByCategoryService} from "services/product"
import {IReqProductByCategory} from "services/product/product.interface"
import {checkStatusFlashSale, getTimeFlashSale} from "helpers/promotion.helper"
import {FLASH_SALE_STATUS} from "constants/promotion.constant"
import {formatCurrency} from "helpers/currency-format.helper"
import {PRODUCT_OPTION_TYPE} from "constants/product.constant"

type Actions = BaseAction<State>

export const getProductByCategoryAsync =
  (payload: IReqProductByCategory) =>
  async () => {
    try {
      return await getProductByCategoryService(payload)
    } catch (error: any) {
      return error.response.data
    }
  }

export const setProductsBest = (data: Array<PRODUCT_MODEL>) => {
  return (actions: Actions) => {
    actions.setState({
      ...actions.getState(),
      productsBest: data
    })
  }
}

export const setProducts = (data: Array<PRODUCT_MODEL>) => {
  return (actions: Actions) => {
    actions.setState({
      ...actions.getState(),
      products: data
    })
  }
}

export const setProductsIntroduce = (data: Array<PRODUCT_MODEL>) => {
  return (actions: Actions) => {
    actions.setState({
      ...actions.getState(),
      productsIntroduce: data
    })
  }
}

export const setProductDetail = (data: PRODUCT_MODEL) => {
  return (actions: Actions) => {
    if ((data && data.product_media) && data.product_media.length > 0) {
      let mediaList = []
      for (const media of data.product_media) {
        mediaList.push(media)
      }
      mediaList.sort((item1, item2) => {
        return (item1?.position || 0) - (item2?.position || 0)
      })
      data.product_media = [...mediaList]
    }
    actions.setState({
      ...actions.getState(),
      product: data
    })
  }
}

export const setProductPromotions = (data: PROMOTIONS_PRODUCT_MODEL) => {
  return (actions: Actions) => {
    let flashSale: any = {}
    if (data.flash_sale) {
      const status = checkStatusFlashSale(data.flash_sale)
      if (status === FLASH_SALE_STATUS.HAPPENING) {
        flashSale.product = data.flash_sale.flash_sale_items.find(item => item?.product_id === actions.getState().product.id)
      }
      flashSale.status = status

      flashSale.timeInfo = getTimeFlashSale(data.flash_sale)
    }
    actions.setState({
      ...actions.getState(),
      promotions: {
        flash_sale: flashSale
      }
    })
  }
}

export const setProductOptions = (product: PRODUCT_MODEL) => {
  return (actions: Actions) => {
    if (!product.id) return
    if (!product.product_variants || product.product_variants.length === 0) return
    const option1 = product.product_options?.find(option => option?.name === product.opt1)
    const option2 = product.product_options?.find(option => option?.name === product.opt2)
    const option3 = product.product_options?.find(option => option?.name === product.opt3)
    const productVariants = product.product_variants?.filter(variant => variant.is_active && (variant.quantity || 0) > 0)
    const selectedVariant = productVariants?.[0]

    let optionsArr1: any = []
    let optionsArr2: any = []
    let optionsArr3: any = []

    if (option1?.values && option1.values.length > 0) {
      for (const option of option1.values) {
        let quantity = 0
        for (const variant of productVariants) {
          if (variant?.opt1?.trim() === option?.trim()) {
            quantity += (variant?.quantity || 0)
          }
        }
        optionsArr1.push({value: option, isDisabled: quantity === 0})
      }
    }
    if (option2?.values && option2.values.length > 0) {
      for (const option of option2.values) {
        let quantity = 0
        for (const variant of productVariants) {
          if (variant?.opt1?.trim() === selectedVariant?.opt1?.trim() && variant?.opt2?.trim() === option?.trim()) {
            quantity += (variant?.quantity || 0)
          }
        }
        optionsArr2.push({value: option, isDisabled: quantity === 0})
      }
    }
    if (option3?.values && option3.values.length > 0) {
      for (const option of option3.values) {
        let quantity = 0
        for (const variant of productVariants) {
          if (variant?.is_active) {
            if ((variant?.opt1?.trim() === selectedVariant?.opt1?.trim() && variant?.opt2?.trim() === selectedVariant?.opt2?.trim()) && variant?.opt3?.trim() === option?.trim()) {
              quantity += (variant?.quantity || 0)
            }
          }
        }
        optionsArr3.push({value: option, isDisabled: quantity === 0})
      }
    }
    const data = calculatePriceDiscount(product, productVariants, selectedVariant)

    actions.setState({
      ...actions.getState(),
      product: {
        ...actions.getState().product,
        price_promotion_display: data?.pricePromotion,
        percent_promotion_display: data?.percentPromotion
      },
      selectedVariant: selectedVariant,
      productOptionsCustom: {
        options1: {values: optionsArr1, label: option1?.name},
        options2: {values: optionsArr2, label: option2?.name},
        options3: {values: optionsArr3, label: option3?.name}
      }
    })
  }
}

export const handleVariantSelected = (optionType: string, selectOption: any) => {
  return (actions: Actions) => {
    let currentSelectedVariant: PRODUCT_VARIANT_MODEL | undefined
    const product = actions.getState().product
    const productVariants = product?.product_variants
    const prevSelectedVariant = actions.getState().selectedVariant
    const productOptionsCustom = actions.getState().productOptionsCustom
    if (!product.id) return
    if (!productVariants || productVariants.length === 0) return

    if (!selectOption?.isDisabled) {
      let optionsArr2 = productOptionsCustom?.options2?.values
      let optionsArr3 = productOptionsCustom?.options3?.values
      switch (optionType) {
        case PRODUCT_OPTION_TYPE.TYPE1:
          if (optionsArr2?.length > 0) {
            for (const option of optionsArr2) {
              let quantity = 0
              for (const variant of productVariants) {
                if (variant?.is_active) {
                  if (variant?.opt1?.trim() === selectOption?.value?.trim() && variant?.opt2?.trim() === option?.value?.trim()) {
                    quantity += (variant.quantity || 0)
                  }
                }
              }
              option.isDisabled = (quantity === 0)
            }
          }
          const selectedOption2 = optionsArr2?.sort((a,b) => (a?.isDisabled ? 1 : 0) - (b?.isDisabled ? 1 : 0))?.[0]
          if (optionsArr3?.length > 0) {
            for (const option of optionsArr3) {
              let quantity = 0
              for (const variant of productVariants) {
                if (variant?.is_active) {
                  if ((variant?.opt1?.trim() === prevSelectedVariant?.opt1?.trim() && variant?.opt2?.trim() === selectedOption2?.value?.trim()) && variant?.opt3?.trim() === option?.value?.trim()) {
                    quantity += (variant.quantity || 0)
                  }
                }
              }
              option.isDisabled = (quantity === 0)
            }
            const selectedOption3 = optionsArr3?.sort((a,b) => (a?.isDisabled ? 1 : 0) - (b?.isDisabled ? 1 : 0))?.[0]
            currentSelectedVariant = productVariants?.find((item) => (item?.opt1?.trim() === selectOption?.value?.trim() && item?.opt2?.trim() === selectedOption2?.value?.trim()) && item?.opt3?.trim() === selectedOption3?.value?.trim())
          } else {
            currentSelectedVariant = productVariants?.find((item) => item?.opt1?.trim() === selectOption?.value?.trim() && item?.opt2?.trim() === selectedOption2?.value?.trim())
          }

          actions.setState({
            ...actions.getState(),
            productOptionCustom: {
              ...actions.getState().productOptionsCustom,
              options2: optionsArr2,
              options3: optionsArr3
            }
          })
          break
        case PRODUCT_OPTION_TYPE.TYPE2:
          if (optionsArr3?.length > 0) {
            for (const option of optionsArr3) {
              let quantity = 0
              for (const variant of productVariants) {
                if (variant?.is_active) {
                  if ((variant?.opt1?.trim() === prevSelectedVariant?.opt1?.trim() && variant?.opt2?.trim() === selectOption?.value?.trim()) && variant?.opt3?.trim() === option?.value?.trim()) {
                    quantity += (variant.quantity || 0)
                  }
                }
              }
              option.isDisabled = (quantity === 0)
            }
            const selectedOption3 = optionsArr3?.sort((a,b) => (a?.isDisabled ? 1 : 0) - (b?.isDisabled ? 1 : 0))?.[0]
            currentSelectedVariant = productVariants?.find((item) => (item?.opt1?.trim() === prevSelectedVariant?.opt1?.trim() && item?.opt2?.trim() === selectOption?.value?.trim()) && item?.opt3?.trim() === selectedOption3?.value?.trim())
          } else {
            currentSelectedVariant = productVariants?.find((item) => item?.opt1?.trim() === prevSelectedVariant?.opt1?.trim() && item?.opt2?.trim() === selectOption?.value?.trim())
          }

          actions.setState({
            ...actions.getState(),
            productOptionCustom: {
              ...actions.getState().productOptionsCustom,
              options3: optionsArr3
            }
          })
          break
        case PRODUCT_OPTION_TYPE.TYPE3:
          currentSelectedVariant = productVariants?.find((item) => (item?.opt1?.trim() === prevSelectedVariant?.opt1?.trim() && item?.opt2?.trim() === prevSelectedVariant?.opt2?.trim()) && item?.opt3?.trim() === selectOption?.value?.trim())
          break
        default:
          break
      }
    }

    const data = calculatePriceDiscount(product, productVariants, currentSelectedVariant)

    actions.setState({
      ...actions.getState(),
      selectedVariant: {...currentSelectedVariant, counter: 1},
      product: {
        ...actions.getState().product,
        price_promotion_display: data?.pricePromotion,
        percent_promotion_display: data?.percentPromotion
      }
    })
  }
}

const calculatePriceDiscount =
    (product: PRODUCT_MODEL,
     productVariants: Array<PRODUCT_VARIANT_MODEL>,
     selectedVariant?: PRODUCT_VARIANT_MODEL,
     flashSale?: FLASH_SALE_MODEL
    ) => {
      if (!product.id) return
      if (!product.product_variants || product.product_variants.length === 0) return
      if (product.price === undefined || product.price === null) return
      let pricePromotion = null
      let pricePromotionMin = 0
      let pricePromotionMax = 0
      let price = product.price
      let percentPromotion = null
      let variants = []
      let product_variant = null
      if (selectedVariant?.id !== undefined) {
        for (const variant of productVariants) {
          if (variant?.opt1?.trim() === selectedVariant?.opt1?.trim()) {
            if (variant?.opt2?.trim() !== null) {
              if (variant?.opt2?.trim() === selectedVariant?.opt2?.trim()) {
                if (variant?.opt3?.trim() !== null) {
                  if (variant?.opt3?.trim() === selectedVariant?.opt3?.trim()) {
                    variants.push(variant)
                    product_variant = variant
                    price = variant.variant_retail_price || 0
                  }
                } else {
                  variants.push(variant)
                  product_variant = variant
                  price = variant.variant_retail_price || 0
                }
              }
            } else {
              variants.push(variant)
              product_variant = variant
              price = variant.variant_retail_price || 0
            }
          }
        }
      } else {
        variants = productVariants
      }
      if (variants?.length > 0) {
        for (const variant of variants) {
          if (variant.promotion_retail_price && variant.promotion_retail_price > 0) {
            if (pricePromotionMin === 0 ||
                pricePromotionMin > variant?.promotion_retail_price) {
              pricePromotionMin = variant?.promotion_retail_price
            }
            if (pricePromotionMax === 0 ||
                pricePromotionMax < variant?.promotion_retail_price) {
              pricePromotionMax = variant?.promotion_retail_price
            }
          }
        }
      } else {
        if (product.promotion_price && product.promotion_price > 0) {
          pricePromotionMin = product.promotion_price
        }
      }
      if (pricePromotionMin > 0) {
        pricePromotion = '' + formatCurrency(pricePromotionMin)
        if (product_variant !== null && (product_variant.variant_retail_price !== undefined && product_variant.variant_retail_price !== null)) {
          percentPromotion = Math.round((product_variant.variant_retail_price - pricePromotionMin) / product_variant.variant_retail_price * 100)
        } else {
          percentPromotion = Math.round((product.price - pricePromotionMin) / product.price * 100)
        }
      }

      if (flashSale?.id && checkStatusFlashSale(flashSale) === FLASH_SALE_STATUS.HAPPENING) {
        const retailPrice = (product_variant ? product_variant?.variant_retail_price : price) || 0
        const flashSaleItem = flashSale?.flash_sale_items?.find(item => item?.product_id === product?.id)
        if (flashSaleItem) {
          const promotionPrice = (flashSaleItem?.value && flashSaleItem?.value > 0) ? flashSaleItem?.value : ((flashSaleItem?.rate || 0) * retailPrice / 100)
          pricePromotion = formatCurrency(price - promotionPrice)
          percentPromotion = Math.round(promotionPrice / retailPrice * 100)
        }
      }

      return {pricePromotion: pricePromotion, percentPromotion: percentPromotion}
}

export const setProductAmount = (amount: number) => {
  return (actions: Actions) => {
    actions.setState({
      ...actions.getState(),
      selectedVariant: {
        ...actions.getState().selectedVariant,
        counter: amount
      }
    })
  }
}