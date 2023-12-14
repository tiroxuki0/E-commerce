import { GetServerSideProps } from "next"
import {useEffect} from "react"
import ReviewProduct from "components/pages/review-product"
import {getProductBySlugService} from "services/product"
import {PRODUCT_MODEL} from "models/product.model"
import {useProduct} from "stores/product"

interface ReviewProductProps {
  product: PRODUCT_MODEL
}

const ReviewProductPage = (props: ReviewProductProps) => {
  const [, actionProduct] = useProduct()

  useEffect(() => {

    actionProduct.setProductDetail(props.product)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <ReviewProduct />
  )
}

export default ReviewProductPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const product_slug = context.query?.product as string
  const redirect = {
    permanent: false,
    destination: '/404'
  }

  if (!product_slug) return {redirect}
  const result = await getProductBySlugService(product_slug)
  if (!result.data || !result.data?.product) return {redirect}

  return {
    props: {
      product: result.data.product,
      isDetailScreen: true
    }
  }
}
