import {BaseAction} from ".."
import {State} from "./index"
import {PRODUCT_MODEL, PRODUCT_VARIANT_MODEL} from "models/product.model"
import {SHOP_CART_ITEM_MODEL, SHOPPING_CART_MODEL} from "models/shopping-cart.model"
import {PRODUCT_DEAL_SHOCK_TYPE, PRODUCT_PROMOTION} from "constants/promotion.constant"
import {BASE_CONSTANTS} from "constants/base.constant"
import {getPromotionsNowByProductIdService} from "services/promotion"
import {convertPrice} from "helpers/product.helper"

type Actions = BaseAction<State>

export const getShoppingCarts = () => {
  return async (actions: Actions) => {
    const shoppingCarts = JSON.parse(localStorage.getItem(BASE_CONSTANTS.SHOP_CART_STORE) || 'null')
    let totalProductsInShoppingCart = 0
    if (shoppingCarts && shoppingCarts.length > 0) {
      for (const shopCart of shoppingCarts) {
        if (shopCart?.sells?.length > 0) {
          for (const sellItem of shopCart?.sells) {
            totalProductsInShoppingCart += sellItem?.number
          }
        }
      }
    }
    actions.setState({
      ...actions.getState(),
      shoppingCarts: shoppingCarts,
      totalQuantity: totalProductsInShoppingCart
    })
  }
}

export const addToCart = (
    product: PRODUCT_MODEL,
    variant: PRODUCT_VARIANT_MODEL,
    isUpdateShopCart?: boolean,
    updateVariant?: PRODUCT_VARIANT_MODEL,
    isEdit?: boolean,
) => {
  return async (actions: Actions) => {
    if (product && product.id) {
      let currentShoppingCarts = JSON.parse(localStorage.getItem(BASE_CONSTANTS.SHOP_CART_STORE) || 'null')
      if (!currentShoppingCarts || currentShoppingCarts === 'null') {
        localStorage.setItem(BASE_CONSTANTS.SHOP_CART_STORE, JSON.stringify([]))
        currentShoppingCarts = []
      }
      let addedItem = {number: variant.counter || 1, product: product, variant: variant}
      const response = await getPromotionsNowByProductIdService(product.id)
      let promotion = null
      let position = 0
      if (response?.data?.data) {
        if (response?.data?.data?.flash_sale !== undefined) {
          position = 1
          promotion = {id: PRODUCT_PROMOTION.flash_sale, value: response?.data?.data.flash_sale}
        } else if (response?.data?.data?.deal_shock !== undefined) {
          position = 2
          promotion = {id: PRODUCT_PROMOTION.deal_shock, value: response?.data?.data.deal_shock}
        } else if (response?.data?.data?.combo !== undefined) {
          position = 3
          promotion = {id: PRODUCT_PROMOTION.combo, value: response?.data?.data.combo}
        } else if (response?.data?.data?.sale_off !== undefined) {
          promotion = {id: PRODUCT_PROMOTION.sale_off, value: response?.data?.data?.sale_off}
          position = 4
        } else {
          position = 5
        }
      }
      if (isUpdateShopCart) {
        updateShopCart(addedItem, promotion, currentShoppingCarts, position)
      } else {
        if (isEdit) {
          await updateVariantByProductToShopCart(updateVariant, addedItem, promotion, currentShoppingCarts)
        } else {
          addProductAndVariantToShopCart(addedItem, promotion, currentShoppingCarts, position)
        }
      }
      localStorage.removeItem(BASE_CONSTANTS.SHOP_CART_STORE)
      localStorage.setItem(BASE_CONSTANTS.SHOP_CART_STORE, JSON.stringify(currentShoppingCarts))

      actions.setState({
        ...actions.getState(),
        shoppingCarts: currentShoppingCarts?.sort((a: any, b: any) => a.position > b.position ? 1 : -1)
      })
    }
  }
}

const addProductAndVariantToShopCart = (
    addedItem: any,
    promotion: any,
    currentShoppingCarts: Array<SHOPPING_CART_MODEL>,
    position: number
) => {
  if (promotion?.id === PRODUCT_PROMOTION.flash_sale || promotion?.id === PRODUCT_PROMOTION.sale_off) {
    addedItem.promotion = promotion
  }
  let isCheckItem = true
  if (currentShoppingCarts?.length > 0) {
    isCheckItem = false
    let currentShopCartIndex = -1
    currentShopCartIndex = currentShoppingCarts?.findIndex((cart: any) => cart?.promotion?.id === promotion?.id && cart?.promotion?.value?.id === promotion?.value?.id)
    if (currentShopCartIndex > -1) {
      currentShoppingCarts[currentShopCartIndex].promotion = promotion
      let isCheck = true
      let totalPrice = 0
      let totalSellItem = 0
      for (let index = 0; index < currentShoppingCarts[currentShopCartIndex]?.sells?.length; index++) {
        const sell = currentShoppingCarts[currentShopCartIndex]?.sells[index]
        if (addedItem?.variant?.id > 0) {
          if (sell?.product?.id === addedItem?.product?.id && sell?.variant?.id === addedItem?.variant?.id) {
            sell.number += addedItem.number
            sell.promotion = addedItem?.promotion
            isCheck = false
          }
        } else {
          if (sell?.product?.id === addedItem?.product?.id) {
            sell.number += addedItem.number
            sell.promotion = addedItem?.promotion
            isCheck = false
          }
        }
        if (promotion?.value?.type === PRODUCT_DEAL_SHOCK_TYPE.buy_with_shock_deal_gift) {
          if (promotion?.value?.quantity_limit > 0) {
            totalSellItem += sell?.number
          } else if (promotion?.value?.base_price > 0) {
            totalPrice += (convertPrice(sell) * sell?.number)
          }
        } else if (promotion?.value?.type === PRODUCT_DEAL_SHOCK_TYPE.buy_with_shock_deal_discount) {
          if (promotion?.value?.quantity_limit > 0) {
            totalSellItem += sell?.number
          }
        }
      }
      if (promotion?.value?.type === PRODUCT_DEAL_SHOCK_TYPE.buy_with_shock_deal_gift) {
        if (promotion?.value?.quantity_limit > 0 && promotion?.value?.quantity_limit > totalSellItem) {
          currentShoppingCarts[currentShopCartIndex].gifts = []
        } else if (promotion?.value?.base_price > 0 && promotion?.value?.base_price > totalPrice) {
          currentShoppingCarts[currentShopCartIndex].gifts = []
        }
      } else if (promotion?.value?.type === PRODUCT_DEAL_SHOCK_TYPE.buy_with_shock_deal_discount) {
        if (promotion?.value?.quantity_limit > 0 && promotion?.value?.quantity_limit > totalSellItem) {
          currentShoppingCarts[currentShopCartIndex].gifts = []
        }
      }
      if (isCheck) {
        currentShoppingCarts[currentShopCartIndex].sells?.push(addedItem)
      }
    } else {
      let sellItemIndex = -1
      for (let index = 0; index < currentShoppingCarts?.length; index++) {
        for (let i = 0; i < currentShoppingCarts[index]?.sells?.length; i++) {
          const sell = currentShoppingCarts[index]?.sells[i]
          if (addedItem?.variant?.id > 0) {
            if (sell?.product?.id === addedItem?.product?.id && sell?.variant?.id === addedItem?.variant?.id) {
              currentShopCartIndex = index
              if (currentShoppingCarts[index]?.promotion?.id) {
                sellItemIndex = i
                addedItem.number = addedItem?.number + sell?.number
              } else {
                sell.number = sell?.number + addedItem?.number
                sell.promotion = null
              }
            }
          } else {
            if (sell?.product?.id === addedItem?.product?.id) {
              currentShopCartIndex = index
              if (currentShoppingCarts[index]?.promotion?.id) {
                sellItemIndex = i
                addedItem.number = addedItem?.number + sell?.number
              } else {
                sell.number = sell?.number + addedItem?.number
                sell.promotion = null
              }
            }
          }
        }
      }
      if (sellItemIndex > -1) {
        currentShoppingCarts[currentShopCartIndex]?.sells?.splice(sellItemIndex, 1)
        isCheckItem = true
      } else {
        if (currentShopCartIndex === -1) {
          isCheckItem = true
        }
      }
    }
  }

  if (isCheckItem) {
    const sells = []
    sells.push(addedItem)
    currentShoppingCarts.push({promotion: promotion, sells, position: position})
  }
  return currentShoppingCarts
}

const updateVariantByProductToShopCart = (
    updateVariant: PRODUCT_VARIANT_MODEL | undefined,
    currentItem: any,
    promotion: any,
    currentShoppingCarts: any
) => {
  let indexShopCart = -1
  let indexSellItem = -1
  if (promotion?.id === PRODUCT_PROMOTION.flash_sale && promotion?.value?.id > 0) {
    for (let index = 0; index < currentShoppingCarts?.length; index++) {
      const currentShoppingCart = currentShoppingCarts[index]
      if (currentShoppingCart?.promotion?.id === PRODUCT_PROMOTION.flash_sale && currentShoppingCart?.promotion?.value?.id === promotion?.value?.id) {
        for (let i = 0; i < currentShoppingCart.sells?.length; i++) {
          const sell = currentShoppingCart?.sells[i]
          if (currentItem?.variant?.id > 0) {
            if (sell?.product?.id === currentItem?.product?.id) {
              if (sell?.variant?.id === updateVariant?.id) {
                sell.number = currentItem?.number
                if (sell?.variant?.id !== currentItem?.variant?.id) {
                  indexShopCart = index
                  indexSellItem = i
                }
              } else {
                if (sell?.variant?.id === currentItem?.variant?.id) {
                  sell.variant = updateVariant
                  sell.number = currentItem?.number
                }
              }
            }
          } else {
            if (sell?.product?.id === currentItem?.product?.id) {
              sell.variant = updateVariant
              sell.number = currentItem?.number
            }
          }
        }
      }
    }
  } else if (promotion?.id === PRODUCT_PROMOTION.deal_shock && promotion?.value?.id > 0) {
    for (let index = 0; index < currentShoppingCarts?.length; index++) {
      const currentShoppingCart = currentShoppingCarts[index]
      if (currentShoppingCart?.promotion?.id === PRODUCT_PROMOTION.deal_shock && currentShoppingCart?.promotion?.value?.id === promotion?.value?.id) {
        for (let i = 0; i < currentShoppingCart.sells?.length; i++) {
          const sell = currentShoppingCart?.sells[i]
          if (currentItem?.variant?.id > 0) {
            if (sell?.product?.id === currentItem?.product?.id) {
              if (sell?.variant?.id === updateVariant?.id) {
                sell.number = currentItem?.number
                if (sell?.variant?.id !== currentItem?.variant?.id) {
                  indexShopCart = index
                  indexSellItem = i
                }
              } else {
                if (sell?.variant?.id === currentItem?.variant?.id) {
                  sell.variant = updateVariant
                  sell.number = currentItem?.number
                }
              }
            }
          } else {
            if (sell?.product?.id === currentItem?.product?.id) {
              sell.variant = updateVariant
              sell.number = currentItem?.number
            }
          }
        }
      }
    }
  } else if (promotion?.id === PRODUCT_PROMOTION.combo && promotion?.value?.id > 0) {
    for (let index = 0; index < currentShoppingCarts?.length; index++) {
      const currentShoppingCart = currentShoppingCarts[index]
      if (currentShoppingCart?.promotion?.id === PRODUCT_PROMOTION.combo && currentShoppingCart?.promotion?.value?.id === promotion?.value?.id) {
        for (let i = 0; i < currentShoppingCart.sells?.length; i++) {
          const sell = currentShoppingCart?.sells[i]
          if (currentItem?.variant?.id > 0) {
            if (sell?.product?.id === currentItem?.product?.id) {
              if (sell?.variant?.id === updateVariant?.id) {
                sell.number = currentItem?.number
                if (sell?.variant?.id !== currentItem?.variant?.id) {
                  indexShopCart = index
                  indexSellItem = i
                }
              } else {
                if (sell?.variant?.id === currentItem?.variant?.id) {
                  sell.variant = updateVariant
                  sell.number = currentItem?.number
                }
              }
            }
          } else {
            if (sell?.product?.id === currentItem?.product?.id) {
              sell.variant = updateVariant
              sell.number = currentItem?.number
            }
          }
        }
      }
    }
  } else {
    for (let index = 0; index < currentShoppingCarts?.length; index++) {
      const currentShoppingCart = currentShoppingCarts[index]
      if (currentShoppingCart?.promotion === null) {
        for (let i = 0; i < currentShoppingCart.sells?.length; i++) {
          const sell = currentShoppingCart?.sells[i]
          if (currentItem?.variant?.id > 0) {
            if (sell?.product?.id === currentItem?.product?.id) {
              if (sell?.variant?.id === updateVariant?.id) {
                sell.number = currentItem?.number
                if (sell?.variant?.id !== currentItem?.variant?.id) {
                  indexShopCart = index
                  indexSellItem = i
                }
              } else {
                if (sell?.variant?.id === currentItem?.variant?.id) {
                  sell.variant = updateVariant
                  sell.number = currentItem?.number
                }
              }
            }
          } else {
            if (sell?.product?.id === currentItem?.product?.id) {
              sell.variant = updateVariant
              sell.number = currentItem?.number
            }
          }
        }
      }
    }
  }
  if (indexShopCart > -1 && indexSellItem > -1) {
    currentShoppingCarts[indexShopCart]?.sells?.splice(indexSellItem, 1)
  }
  return currentShoppingCarts
}

const updateShopCart = (
    addedItem: SHOP_CART_ITEM_MODEL,
    promotion: any,
    currentShoppingCarts: Array<SHOPPING_CART_MODEL>,
    position: number
) => {
  if (promotion?.id === PRODUCT_PROMOTION.flash_sale) {
    addedItem.promotion = promotion
  }
  let isCheckItem = true
  if (currentShoppingCarts?.length > 0) {
    isCheckItem = false
    let currentShopCartIndex = -1
    currentShopCartIndex = currentShoppingCarts?.findIndex((cart: any) => cart?.promotion?.id === promotion?.id && cart?.promotion?.value?.id === promotion?.value?.id)
    if (currentShopCartIndex > -1) {
      currentShoppingCarts[currentShopCartIndex].promotion = promotion
      let isCheck = true
      let totalPrice = 0
      let totalSellItem = 0
      for (let index = 0; index < currentShoppingCarts[currentShopCartIndex]?.sells?.length; index++) {
        const sell = currentShoppingCarts[currentShopCartIndex]?.sells[index]
        if (addedItem?.variant?.id) {
          if (sell?.product?.id === addedItem?.product?.id && sell?.variant?.id === addedItem?.variant?.id) {
            isCheck = false
            sell.promotion = addedItem?.promotion
            sell.product = addedItem?.product
            sell.variant = addedItem?.variant
          }
        } else {
          if (sell?.product?.id === addedItem?.product?.id) {
            isCheck = false
            sell.promotion = addedItem?.promotion
            sell.product = addedItem?.product
            sell.variant = addedItem?.variant
          }
        }
        if (promotion?.value?.type === PRODUCT_DEAL_SHOCK_TYPE.buy_with_shock_deal_gift) {
          if (promotion?.value?.quantity_limit > 0) {
            totalSellItem += sell?.number
          } else if (promotion?.value?.base_price > 0) {
            totalPrice += (convertPrice(sell) * sell?.number)
          }
        } else if (promotion?.value?.type === PRODUCT_DEAL_SHOCK_TYPE.buy_with_shock_deal_discount) {
          if (promotion?.value?.quantity_limit > 0) {
            totalSellItem += sell?.number
          }
        }
      }
      if (promotion?.value?.type === PRODUCT_DEAL_SHOCK_TYPE.buy_with_shock_deal_gift) {
        if (promotion?.value?.quantity_limit > 0 && promotion?.value?.quantity_limit > totalSellItem) {
          currentShoppingCarts[currentShopCartIndex].gifts = []
        } else if (promotion?.value?.base_price > 0 && promotion?.value?.base_price > totalPrice) {
          currentShoppingCarts[currentShopCartIndex].gifts = []
        }
      } else if (promotion?.value?.type === PRODUCT_DEAL_SHOCK_TYPE.buy_with_shock_deal_discount) {
        if (promotion?.value?.quantity_limit > 0 && promotion?.value?.quantity_limit > totalSellItem) {
          currentShoppingCarts[currentShopCartIndex].gifts = []
        }
      }
      if (isCheck) {
        currentShoppingCarts[currentShopCartIndex].sells?.push(addedItem)
      }
    } else {
      let sellItemIndex = -1
      for (let index = 0; index < currentShoppingCarts?.length; index++) {
        for (let i = 0; i < currentShoppingCarts[index]?.sells?.length; i++) {
          const sell = currentShoppingCarts[index]?.sells[i]
          if (addedItem?.variant?.id) {
            if (sell?.product?.id === addedItem?.product?.id && sell?.variant?.id === addedItem?.variant?.id) {
              currentShopCartIndex = index
              if (currentShoppingCarts[index]?.promotion?.id || promotion?.id) {
                sellItemIndex = i
              }
            }
          } else {
            if (sell?.product?.id === addedItem?.product?.id) {
              currentShopCartIndex = index
              if (currentShoppingCarts[index]?.promotion?.id || promotion?.id) {
                sellItemIndex = i
              }
            }
          }
        }
      }
      if (sellItemIndex > -1) {
        currentShoppingCarts[currentShopCartIndex]?.sells?.splice(sellItemIndex, 1)
        isCheckItem = true
      } else {
        if (currentShopCartIndex === -1) {
          isCheckItem = true
        }
      }
    }
  }
  if (isCheckItem) {
    const sells = []
    sells.push(addedItem)
    currentShoppingCarts.push({promotion: promotion, sells, position: position})
  }
  return currentShoppingCarts
}
