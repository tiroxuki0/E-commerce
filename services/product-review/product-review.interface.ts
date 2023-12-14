export interface IReqProductReviewsByProduct {
  perPage: number
  page: number
  totalStar: number | null
  type: string | null
}

export interface IReqReviewProduct {
  type?: string
  totalStar: number
  flavor?: string
  name?: string
  email_phone?: string
  product_id: string
  message?: string
  images?: string
  videos?: string
}