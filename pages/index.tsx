import BannerTop from "components/common/banners/banner-top"
import { useEffect, useState } from "react"
import { KEY_SCREEN } from "constants/page-component.constant"
import { getSettingScreenService } from "services/page-components"
import { usePageComponent } from "stores/page-component"
import { PAGE_COMPONENT_MODEL } from "models/page-component.model"
import useDeviceDetect from "hooks/useDeviceDetect"
import { getProductsBestService, getProductsIntroduceService } from "services/product"
import { PRODUCT_MODEL } from "models/product.model"
import { useProduct } from "stores/product"
import FeaturedProducts from "components/pages/home/featured-products"
import Introduction from "components/pages/home/introduction"
import AboutUs from "components/pages/home/about-us"
import Learning from "components/pages/home/learning"
import Stores from "components/pages/home/stores"
import SocialMedia from "components/pages/home/social-media"

interface HomeProps {
  data: PAGE_COMPONENT_MODEL
  productsBest: Array<PRODUCT_MODEL>
  productsIntroduce: Array<PRODUCT_MODEL>
}

const Home = (props: HomeProps) => {
  const [, actionPageComponent] = usePageComponent()
  const [, actionProduct] = useProduct()
  const currentDevice = useDeviceDetect()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    actionPageComponent.setPageComponentHome(props.data)
    actionProduct.setProductsBest(props.productsBest)
    actionProduct.setProductsIntroduce(props.productsIntroduce)
    setIsMobile(currentDevice.isMobile())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <BannerTop isMobile={isMobile} />
      <FeaturedProducts />
      <Introduction />
      <AboutUs />
      <Learning isMobile={isMobile} />
      <Stores />
      <SocialMedia />
    </>
  )
}

export default Home

export const getStaticProps = async () => {
  /* const res = await getSettingScreenService(KEY_SCREEN.HOME)
  const resProducts = await getProductsBestService()
  const resProductsIntroduce = await getProductsIntroduceService() */

  const res = {}
  const resProducts = {}
  const resProductsIntroduce = {}

  return {
    props: {
      // data: res.data ? res.data : {},
      // productsBest: resProducts.data && resProducts.data.products ? resProducts.data.products : [],
      // productsIntroduce: resProductsIntroduce.data && resProductsIntroduce.data.products ? resProductsIntroduce.data.products : []
      data: {},
      productsBest: [],
      productsIntroduce: []
    }
  }
}
