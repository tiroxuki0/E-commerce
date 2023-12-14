import { State } from './index'
export const selector = (state: State) => {
  return {
    reviewsByProduct: state.reviewsByProduct,
    filter: state.filter,
    productId: state.productId,
    reviewMediaList: state.reviewMediaList,
    reviewMediaActiveIndex: state.reviewMediaActiveIndex,
    bodyReview: state.bodyReview,
    isLoading: state.isLoading
  }
}
