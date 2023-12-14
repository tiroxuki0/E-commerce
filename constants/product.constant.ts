export enum PARAM_PRODUCT_TYPE {
  PRODUCT_INTRODUCE = 'sp-intro',
  PRODUCT_BEST = 'sp-best',
  PRODUCT_TRIAL = 'Trải Nghiệm',
  PRODUCT_TRADITIONAL = 'Truyền Thống',
  PRODUCT_FOR_STORES = 'Cho Quán',
  PRODUCT_CONVENIENT = 'Phin Nhanh',
  PRODUCT_ZILI = 'Sản Phẩm Zili',
}

export const LIMIT_ON_SCREEN = 4

export const LIMIT_ON_DETAIL = 8

export enum PRODUCT_OPTION_TYPE {
  TYPE1 = "opt1",
  TYPE2 = "opt2",
  TYPE3 = "opt3"
}

export const REVIEW_TYPES = [
  {
    label: {
      vi: "Tất cả",
      en: "All"
    },
    value: null
  },
  {
    label: {
      vi: "Ảnh",
      en: "Image"
    },
    value: "image"
  },
  {
    label: {
      vi: "Video",
      en: "Video"
    },
    value: "video"
  }
]

export const PRODUCT_FLAVORS = [
  {
    en: 'Sweet',
    vi: 'Vị ngọt'
  },
  {
    en: 'Mild sour',
    vi: 'Chua nhẹ'
  },
  {
    en: 'Bitter',
    vi: 'Đắng đậm'
  }
]

export const PRODUCT_TYPES = [
  {
    en: 'Whole bean',
    vi: 'Nguyên hạt'
  },
  {
    en: 'Powder',
    vi: 'Dạng bột'
  }
]