export const CARD_OPTIONS = [
  { label: "Viettel", value: "Viettel" },
  { label: "Vinaphone", value: "Vinaphone" },
  { label: "Mobifone", value: "Mobifone" },
  { label: "Vietnamobile", value: "Vietnamobile" },
  { label: "Zing", value: "Zing" },
  { label: "Gate", value: "Gate" },
  { label: "Vcoin", value: "Vcoin" },
  { label: "Garena", value: "Garena" }
]

export const PRICE_OPTIONS = [
  { label: "Mệnh giá", value: "" },
  { label: "10.000 đ", value: "10000" },
  { label: "20.000 đ", value: "20000" },
  { label: "30.000 đ", value: "30000" },
  { label: "50.000 đ", value: "50000" },
  { label: "100.000 đ", value: "100000" },
  { label: "200.000 đ", value: "200000" },
  { label: "300.000 đ", value: "300000" },
  { label: "500.000 đ", value: "500000" }
]

export const FILTER_OPTIONS = [
  { label: "allProduct", value: "" },
  { label: "newestProduct", value: "hàng mới" },
  { label: "bestSeller", value: "bán chạy" },
  { label: "lowestPrice", value: "giá thấp" },
  { label: "highestPrice", value: "giá cao" }
]

export const CATEGORY_OPTIONS = [
  { title: "productTrialTitle", label: "productTrial", icon: "trial", value: 0, fillName: "Trải Nghiệm" },
  { title: "productTraditionalTitle", label: "productTraditional", icon: "traditional", value: 1, fillName: "Truyền Thống" },
  { title: "productForStoreTitle", label: "productForStore", icon: "for-store", value: 2, fillName: "Cho Quán" },
  { title: "productConvenientTitle", label: "productConvenient", icon: "convenient", value: 3, fillName: "Phin Nhanh" },
  { title: "productZiliTitle", label: "productZili", icon: "zili", value: 4, fillName: "Sản Phẩm Zili" }
]

export enum CATEGORY_ENUM {
  productTrial = "productTrial",
  productTraditional = "productTraditional",
  productForStore = "productForStore",
  productConvenient = "productConvenient",
  productZili = "productZili"
}

export const OTP_LENGTH = 6

export const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
export const fullNamePattern = /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỂưạảấầẩẫậắằẳẵặẹẻẽềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/

export enum MEDIA_TYPE {
  IMAGE = "image",
  VIDEO = "video"
}

export const DEFAULT_LANGUAGE = "vi"
export const DEFAULT_PHONE_NUMBER = "077 5663 385"
export const DEFAULT_EMAIL = "example@gmail.com"

export const BASE_CONSTANTS = {
  BASE_URL: process.env.BASE_URL || "https://api.zilicoffee.vn/api/v1",
  IMAGE_URL: process.env.IMAGE_URL || "zili.sgp1.digitaloceanspaces.com",
  WEBSITE_KEY: process.env.WEBSITE_KEY || "zili_website",
  MEDIA_DOMAIN: process.env.MEDIA_DOMAIN || "media.zili.vn",
  ENVIRONMENT: process.env.ENVIRONMENT || "development",
  SITE_URL: process.env.SITE_URL || "",
  SHOP_CART_STORE: process.env.SHOP_CART_STORE || "SHOP_CART_STORE"
}

export const LIMIT_RECORD = 10
export const LIMIT_IMAGE = 10
export const LIMIT_VIDEO = 1

export enum LANGUAGE {
  EN = "en",
  VI = "vi"
}
