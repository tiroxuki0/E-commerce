import {PRODUCT_REVIEW_MODEL} from "models/product-review.model";

export const flyToCartAnimation = (e: any) => {
  const cardIconParentElement = document.getElementById('cartIconJs')
  const parentElement = e?.target?.closest('.productCardWrapperJs') //get parent div by class productCardWrapperJs
  const imgElement = parentElement?.getElementsByClassName('productImageJs')?.[0]
  let imgElementClone = document.createElement('img')
  imgElementClone.src = imgElement?.getElementsByTagName('img')?.[0]?.src
  imgElementClone?.classList.add('imageProductFly')
  if (document?.getElementsByClassName('shake')?.[0]) {
    cardIconParentElement?.classList.remove('shake')
  }
  if (imgElementClone) {
    imgElementClone.style.position = 'fixed'
    imgElementClone.style.top = '20vh'
    imgElementClone.style.left = 'calc((100vw - calc(60vh * 3 / 4)) / 2)'
    imgElementClone.style.opacity = '1'
    imgElementClone.style.zIndex = '999990'
    imgElementClone.style.width = '60vh'
    imgElementClone.style.height = '60vh'
    imgElementClone.style.transition = 'all 0.35s ease-in-out'
    imgElementClone.style.objectFit = 'cover'
    document.body?.appendChild(imgElementClone)

    if (cardIconParentElement) {
      const goToX = cardIconParentElement?.offsetLeft
      const goToY = cardIconParentElement?.offsetTop

      setTimeout(function () {
        imgElementClone.style.top = goToY + ((cardIconParentElement.offsetHeight - 24) / 2) +'px'
        imgElementClone.style.left = goToX + ((cardIconParentElement.offsetWidth - 22) / 2) + 'px'
        imgElementClone.style.opacity = '0.4'
        imgElementClone.style.width = '19px'
        imgElementClone.style.height = 'auto'
        setTimeout(function () {
          cardIconParentElement.classList.add('shake')
          imgElementClone.remove()
        }, 500)
      }, 100)
    }
  }
}

export const convertPrice = (item: any) => {
  let price
  if (item?.variant) {
    price = (item?.variant && (item?.variant?.promotion_retail_price !== null && item?.variant?.promotion_retail_price !== undefined) ?
        item?.variant.promotion_retail_price : item?.variant.variant_retail_price)
  } else {
    price = (item?.product && item?.product.price_display !== null ?
        item?.product.price_display : item?.product.price)
  }
  return price
}

export const renderReviewCustomerName = (review: PRODUCT_REVIEW_MODEL) => {
  let name = `${review?.name?.slice(0, 1)}***${review?.name?.slice(-2)}`
  if (review?.customer?.name) {
    name = `${review?.customer?.name?.slice(0, 1)}***${review?.customer?.name?.slice(-2)}`
  }

  return name
}