export interface PRODUCT_MODEL {
  readonly id: string
  material_urls?: Array<string>
  price?: number
  name?: string
  name_display?: string
  short_name?: string
  opt1?: string
  opt2?: string
  opt3?: string
  category?: string
  category_code?: string
  promotion_price?: number
  price_display?: number
  product_slug?: string
  image_base_url?: string
  image_base_url_thumb?: string
  total_quantity?: number
  total_like?: number
  total_sales?: number,
  meta_title?: string
  meta_description?: string
  product_media?: Array<PRODUCT_MEDIA_MODEL>
  product_options?: Array<PRODUCT_OPTION_MODEL>
  product_flavors?: Array<PRODUCT_FLAVOR_MODEL>
  product_variants?: Array<PRODUCT_VARIANT_MODEL>
  product_image_details?: Array<PRODUCT_IMAGE_DETAIL_MODEL>
  product_description?: string
  //fields for calculator
  percent_promotion_display?: number
  price_promotion_display?: number
}

export interface RES_PRODUCTS_MODEL {
  products: Array<PRODUCT_MODEL>
  totalRecords: number
}
export interface RES_PRODUCT_BY_SLUG_MODEL {
  product: PRODUCT_MODEL
}

export interface PRODUCT_OPTION_MODEL {
  id: number
  name: string
  values: Array<string>
  isDisabled?: boolean
}

export interface PRODUCT_OPTION_CUSTOM_MODEL {
  value?: string
  isDisabled?: boolean
}

export interface PRODUCT_FLAVOR_MODEL {
  id: number
  image_url: string
  title_en: string
  title_vi: string
}

export interface PRODUCT_VARIANT_MODEL {
  id: string
  tenant_id?: string
  category_id?: string
  brand_id?: string
  product_id?: string
  init_price?: number
  init_stock?: number
  variant_retail_price?: number
  variant_whole_price?: number
  variant_import_price?: number
  promotion_retail_price?: number
  description?: string
  name?: string
  opt1?: string
  opt2?: string
  opt3?: string
  product_name?: string
  status?: string
  image_url?: string
  thumb_url?: string
  quantity?: number
  is_active?: boolean
  // field for select amount in product detail
  counter?: number
}

export interface PRODUCT_MEDIA_MODEL {
  color?: string
  deleteFlag?: string
  media_type: string
  position?: number
  product_id?: string
  id?: number
  url: string
  url_thumb?: string
}

export interface PRODUCT_IMAGE_DETAIL_MODEL {
  position: number
  image_url: string
}