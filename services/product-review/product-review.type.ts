import { ReturnResponse } from 'configs/api/response.interface'
import {
    RES_PRODUCT_REVIEWS_BY_PRODUCT_MODEL,
    RES_CREATE_PRODUCT_REVIEW_MODEL
} from "models/product-review.model"

export type resProductReviewsByProduct = ReturnResponse<RES_PRODUCT_REVIEWS_BY_PRODUCT_MODEL>
export type resCreateProductReview = ReturnResponse<RES_CREATE_PRODUCT_REVIEW_MODEL>