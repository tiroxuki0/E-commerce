import { ROUTE_API } from "constants/route-api.contant"
import API from "configs/api/repository-api"
import {
  resProductReviewsByProduct,
  resCreateProductReview
} from "./product-review.type"
import {IReqProductReviewsByProduct, IReqReviewProduct} from "./product-review.interface"

const url = ROUTE_API.review

export const getReviewsByProductService = async (productId: string, params: IReqProductReviewsByProduct): Promise<any> => {
  return (await API.get(`${url}/product/${productId}`, { ...params })) as Promise<resProductReviewsByProduct>
}

export const createProductReviewService = async (payload: IReqReviewProduct): Promise<any> => {
  return (await API.post(`${url}/create`, {body: {...payload}})) as Promise<resCreateProductReview>
}