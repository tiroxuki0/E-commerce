import { ReturnResponse } from 'configs/api/response.interface'
import { PROMOTION_MODEL } from "models/promotion.model"

export type resPromotionsByProductId = ReturnResponse<Array<PROMOTION_MODEL>>