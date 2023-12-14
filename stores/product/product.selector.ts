import { State } from './index'
export const selector = (state: State) => {
  return {
    productsBest: state.productsBest,
    productsIntroduce: state.productsIntroduce,
    products: state.products,
    product: state.product,
    promotions: state.promotions,
    selectedVariant: state.selectedVariant,
    productOptionsCustom: state.productOptionsCustom
  }
}
