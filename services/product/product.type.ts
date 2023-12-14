import { ReturnResponse } from 'configs/api/response.interface'
import {
    RES_PRODUCTS_MODEL,
    RES_PRODUCT_BY_SLUG_MODEL
} from "models/product.model"

export type resProductsBest = ReturnResponse<RES_PRODUCTS_MODEL>
export type resProducts = ReturnResponse<RES_PRODUCTS_MODEL>
export type resProductBySlug = ReturnResponse<RES_PRODUCT_BY_SLUG_MODEL>