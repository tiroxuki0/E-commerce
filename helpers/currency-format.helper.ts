export const formatCurrency = (price: number) => {
  if (price === undefined || price === null) return
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ'
}

// Rial currency format
export const irrCurrencyFormat = (price: number | undefined) => {
  return price ? new Intl.NumberFormat("fa-IR").format(price) : null
}

//pound currency format
export const gbpCurrencyFormat = (price: number | undefined) => {
  return price ? new Intl.NumberFormat("en-GB").format(price) : null
}
