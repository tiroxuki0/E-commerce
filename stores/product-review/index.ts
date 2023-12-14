import {
  handleSelectStarFilter,
  setProductReviewsByProduct,
  handleSelectTypeFilter,
  handleSelectedReviewMedia,
  handleSelectPage,
  handleReviewProduct,
  handleSelectedFlavor,
  handleSelectedType,
  handleRemoveImage,
  handleSelectedImages,
  setVideo,
  setRating
} from "./product-review.action"
import { createHook, createStore } from "react-sweet-state"
import { selector } from "./product-review.selector"
import {RES_PRODUCT_REVIEWS_BY_PRODUCT_MODEL} from "models/product-review.model"
import {PRODUCT_MEDIA_MODEL} from "models/product.model"
import {IReqProductReviewsByProduct} from "services/product-review/product-review.interface"
import {LIMIT_RECORD} from "constants/base.constant"

export type State = {
  reviewsByProduct: RES_PRODUCT_REVIEWS_BY_PRODUCT_MODEL
  filter: IReqProductReviewsByProduct
  productId: string | null
  reviewMediaList: PRODUCT_MEDIA_MODEL[]
  reviewMediaActiveIndex: number
  bodyReview: {
    flavors?: { en: string, vi: string }[]
    type?: {en: string, vi: string}
    totalStar: number
    images?: Blob[]
    video?: Blob
  },
  isLoading: boolean
}

const initialState: State = {
  reviewsByProduct: {
    reviews: [],
    totalRecords: 0,
    total: 0,
    totalStar1: 0,
    totalStar2: 0,
    totalStar3: 0,
    totalStar4: 0,
    totalStar5: 0,
    avgStart: 0
  },
  productId: null,
  filter: {
    type: null,
    page: 1,
    perPage: LIMIT_RECORD,
    totalStar: null
  },
  reviewMediaList: [],
  reviewMediaActiveIndex: 0,
  bodyReview: {totalStar: 0},
  isLoading: false
}

const actions = {
  handleSelectStarFilter,
  handleSelectTypeFilter,
  setProductReviewsByProduct,
  handleSelectedReviewMedia,
  handleSelectPage,
  handleReviewProduct,
  handleSelectedFlavor,
  handleSelectedType,
  handleRemoveImage,
  handleSelectedImages,
  setVideo,
  setRating
}

const Store = createStore({
  initialState,
  actions
})

export const useProductReview = createHook(Store, { selector: selector })
