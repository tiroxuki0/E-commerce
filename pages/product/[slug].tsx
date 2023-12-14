import {useEffect} from "react"
import {GetServerSideProps} from "next"
import {useProduct} from "stores/product"
import {useProductReview} from "stores/product-review"
import {usePageComponent} from "stores/page-component"
import {getProductBySlugService, getProductsService} from "services/product"
import {getPromotionsByProductIdService} from "services/promotion"
import {getReviewsByProductService} from "services/product-review"
import {getSettingScreenService} from "services/page-components"
import {PRODUCT_MODEL} from "models/product.model"
import {PROMOTIONS_PRODUCT_MODEL} from "models/promotion.model"
import {RES_PRODUCT_REVIEWS_BY_PRODUCT_MODEL} from "models/product-review.model"
import {PAGE_COMPONENT_MODEL} from "models/page-component.model"
import ProductInfo from "components/pages/product-detail/product-info"
import ProductDescription from "components/pages/product-detail/product-description"
import ProductOrigin from "components/pages/product-detail/product-origin"
import ProductReview from "components/pages/product-detail/product-review"
import ProductList from "components/pages/product-detail/product-list"
import {LIMIT_RECORD} from "constants/base.constant"
import {KEY_HOME_COMPONENT, KEY_SCREEN} from "constants/page-component.constant"

interface Props {
  product: PRODUCT_MODEL,
  promotions: PROMOTIONS_PRODUCT_MODEL,
  reviewsData: RES_PRODUCT_REVIEWS_BY_PRODUCT_MODEL,
  bannerProductMore: PAGE_COMPONENT_MODEL,
  productMore: Array<PRODUCT_MODEL>
}

const ProductDetail = (props: Props) => {
  const [, actionProduct] = useProduct()
  const [, actionReview] = useProductReview()
  const [, actionPageComponent] = usePageComponent()

  useEffect(() => {
    setTimeout(
        () =>  window.scrollTo(0, 0),
        300
    )

    actionProduct.setProductDetail(props.product)
    actionProduct.setProductPromotions(props.promotions)
    actionReview.setProductReviewsByProduct(props.product?.id, props.reviewsData)
    actionProduct.setProducts(props.productMore)
    actionPageComponent.setBannerProductMore(props.bannerProductMore)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <>
      <ProductInfo />
      <ProductDescription />
      <ProductOrigin />
      <ProductReview />
      <ProductList />
    </>
  )
}

export default ProductDetail

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {query} = context
  const redirect = {
    permanent: false,
    destination: '/404'
  }

  if (!query.slug) return {redirect}
  const result = await getProductBySlugService(query.slug as string)
  if (!result.data) return {redirect}
  const resultPageComponent = await getSettingScreenService(KEY_SCREEN.HOME, KEY_HOME_COMPONENT.HOME_PRODUCT_MORE)
  const resultProducts = await getProductsService({tu: 0, den: 3})

  let promotions = []
  let reviewsData = []
  if (result.data?.product?.id) {
    const promotionsResult = await getPromotionsByProductIdService({product_id: result.data?.product?.id, is_full: false})
    promotions = promotionsResult.data
    const reviewsResult = await getReviewsByProductService(result.data?.product?.id, {perPage: LIMIT_RECORD, page: 1, type: null, star: null})
    reviewsData = reviewsResult?.data
  }

  return {
    props: {
      product: result.data?.product || null,
      promotions: promotions || null,
      reviewsData: reviewsData || [],
      isDetailScreen: true,
      productMore: resultProducts.data?.products || [],
      bannerProductMore: resultPageComponent?.data
    }
  }
}
