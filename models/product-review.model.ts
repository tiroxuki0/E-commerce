export interface PRODUCT_REVIEW_MODEL {
  readonly id: number
  user_image: string | null
  name: string
  totalStar: number
  customer: {
    name: string
    avatar: string
  }
  images: string
  videos: string
  is_shopee: boolean
  message: string
  updatedAt: string
  reply_reviews: Array<PRODUCT_REVIEW_REPLY_MODEL>
  type: string
  flavor: string,
  createdAt: string
}

export interface PRODUCT_REVIEW_REPLY_MODEL {
  message: string
}

export interface RES_PRODUCT_REVIEWS_BY_PRODUCT_MODEL {
  reviews: Array<PRODUCT_REVIEW_MODEL>,
  totalRecords: number,
  total: number,
  totalStar1: number,
  totalStar2: number,
  totalStar3: number,
  totalStar4: number,
  totalStar5: number,
  avgStart: number
}

export interface RES_CREATE_PRODUCT_REVIEW_MODEL {
  data: boolean,
  message: string,
  status: boolean
}