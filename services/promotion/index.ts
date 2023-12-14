import { ROUTE_API } from "constants/route-api.contant"
import API from "configs/api/repository-api"
import {
  resPromotionsByProductId
} from "./promotion.type"
import {IReqPromotionByProductId} from "services/promotion/promotion.interface"

const url = ROUTE_API.promotion
const urlProducts = ROUTE_API.product

export const getPromotionsByProductIdService = async (params: IReqPromotionByProductId): Promise<any> => {
  return (await API.get(`${url}/${urlProducts}`, { ...params })) as Promise<resPromotionsByProductId>
}

export const getPromotionsNowByProductIdService = async (productId: string): Promise<any> => {
  return (await API.get(`${url}/${urlProducts}/now/${productId}`)) as Promise<resPromotionsByProductId>
}
