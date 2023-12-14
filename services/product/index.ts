import { ROUTE_API } from "constants/route-api.contant"
import API from "configs/api/repository-api"
import {
  resProductBySlug,
  resProductsBest,
  resProducts
} from "./product.type"
import { PARAM_PRODUCT_TYPE } from "constants/product.constant"
import { SCREEN_ITEM_STATUS } from "constants/page-component.constant"
import { IReqProductByCategory, IReqProducts } from "services/product/product.interface"

const urlSearchProducts = ROUTE_API.url_search_products
const urlSlug = ROUTE_API.slug
const url = ROUTE_API.product

export const getProductByCategoryService = async (params: IReqProductByCategory): Promise<any> => {
  return (await API.get(`${url}/${urlSearchProducts}`, { ...params })) as Promise<resProductsBest>
}

export const getProductsService = async (params: IReqProducts): Promise<any> => {
  return (await API.get(`${url}/${urlSearchProducts}`, { ...params })) as Promise<resProducts>
}

export const getProductsBestService = async (): Promise<resProductsBest> => {
  return (await API.get(`${url}/${urlSearchProducts}/with-screen`, {
    loai: PARAM_PRODUCT_TYPE.PRODUCT_BEST,
    "trang-thai": SCREEN_ITEM_STATUS.ACTIVE,
    tu: 0,
    den: 5
  })) as Promise<resProductsBest>
}

export const getProductsIntroduceService = async (): Promise<resProductsBest> => {
  return (await API.get(`${url}/${urlSearchProducts}/with-screen`, {
    loai: PARAM_PRODUCT_TYPE.PRODUCT_INTRODUCE,
    "trang-thai": SCREEN_ITEM_STATUS.ACTIVE,
    tu: 0,
    den: 5
  })) as Promise<resProductsBest>
}

export const getProductBySlugService = async (slug: string): Promise<resProductBySlug> => {
  return (await API.get(`${url}/${urlSlug}/${slug}`)) as Promise<resProductBySlug>
}
