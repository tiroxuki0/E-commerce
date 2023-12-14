export interface ICartProduct {
  image: any
  name: string
  slug: any
  price: number
  discount?: number
  brand: string
  category: string[]
  starRating: number
  isOffer?: boolean
  details?: any
  registerDate?: string
  quantity: number
  totalPrice: number
}

export interface ICartUI {
  cartBoxIsVisible: boolean
}

export interface ICart {
  items: ICartProduct[]
  totalQuantity: number
  totalAmount: number
}

export interface ICartUiRootState {
  cartUi: ICartUI
}
export interface ICartRootState {
  cart: ICart
}
