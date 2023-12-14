import { useRouter } from "next/router"
import BannerTop from "components/common/banners/banner-top"
import { useEffect, useState } from "react"
import useDeviceDetect from "hooks/useDeviceDetect"
import { getProductByCategoryService } from "services/product"
import { GetServerSideProps } from "next"
import { PRODUCT_MODEL } from "models/product.model"
import ProductByCategory from "components/pages/product/product-by-category"
import ProductInfiniteScroll from "components/pages/product/product-infinite-scroll"
import ProductByZili from "components/pages/product/product-by-zili"
import ProductFilter from "components/pages/product/filter"
import Categories from "components/pages/product/categories"
import { CATEGORY_ENUM } from "constants/base.constant"
import { SCREEN_ITEM_STATUS } from "constants/page-component.constant"
import { PARAM_PRODUCT_TYPE, LIMIT_ON_SCREEN } from "constants/product.constant"

interface ProductListProps {
  products: Array<PRODUCT_MODEL>
  productTrial: Array<PRODUCT_MODEL>
  productTraditional: Array<PRODUCT_MODEL>
  productForStore: Array<PRODUCT_MODEL>
  productConvenient: Array<PRODUCT_MODEL>
  productZili: Array<PRODUCT_MODEL>
  totalRecord: number
}

const ProductList = (props: ProductListProps) => {
  const currentDevice = useDeviceDetect()
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const category = router.query.category

  useEffect(() => {
    setIsMobile(currentDevice.isMobile())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <>
      <BannerTop isMobile={isMobile} />
      <Categories />
      <ProductFilter totalRecord={props.totalRecord} />
      {!category ? (
        <>
          <ProductByCategory data={props?.productTrial} type={CATEGORY_ENUM.productTrial} icons={true} />
          <ProductByCategory data={props?.productTraditional} type={CATEGORY_ENUM.productTraditional} icons={true} />
          <ProductByCategory data={props?.productForStore} type={CATEGORY_ENUM.productForStore} icons={false} />
          <ProductByCategory data={props?.productConvenient} type={CATEGORY_ENUM.productConvenient} icons={false} />
          <ProductByZili data={props?.productZili} type={CATEGORY_ENUM.productZili} icons={false} />
        </>
      ) : (
        <ProductInfiniteScroll />
      )}
      {category === CATEGORY_ENUM.productZili && <ProductByZili data={props?.products} type={CATEGORY_ENUM.productZili} icons={false} />}
    </>
  )
}

export default ProductList

export const getServerSideProps: GetServerSideProps = async (context) => {
  const category = context.query.category as string
  const filter = context.query.filter as string
  if (category) {
    const products = await getProductByCategoryService({ loai: category || "", tu: 0, den: LIMIT_ON_SCREEN, loc: filter || "", "trang-thai": SCREEN_ITEM_STATUS.ACTIVE })
    return {
      props: {
        products: products.data.products,
        totalRecord: products.data.totalRecords
      }
    }
  } else {
    const promiseProductTrial = getProductByCategoryService({ loai: PARAM_PRODUCT_TYPE.PRODUCT_TRIAL || "", tu: 0, den: LIMIT_ON_SCREEN, loc: filter || "", "trang-thai": SCREEN_ITEM_STATUS.ACTIVE })
    const promiseProductTraditional = getProductByCategoryService({
      loai: PARAM_PRODUCT_TYPE.PRODUCT_TRADITIONAL || "",
      tu: 0,
      den: LIMIT_ON_SCREEN,
      loc: filter || "",
      "trang-thai": SCREEN_ITEM_STATUS.ACTIVE
    })
    const promiseProductForStore = getProductByCategoryService({
      loai: PARAM_PRODUCT_TYPE.PRODUCT_FOR_STORES || "",
      tu: 0,
      den: LIMIT_ON_SCREEN,
      loc: filter || "",
      "trang-thai": SCREEN_ITEM_STATUS.ACTIVE
    })
    const promiseProductConvenient = getProductByCategoryService({
      loai: PARAM_PRODUCT_TYPE.PRODUCT_CONVENIENT || "",
      tu: 0,
      den: LIMIT_ON_SCREEN,
      loc: filter || "",
      "trang-thai": SCREEN_ITEM_STATUS.ACTIVE
    })
    const promiseProductZili = getProductByCategoryService({ loai: PARAM_PRODUCT_TYPE.PRODUCT_ZILI || "", tu: 0, den: LIMIT_ON_SCREEN, loc: filter || "", "trang-thai": SCREEN_ITEM_STATUS.ACTIVE })

    const promiseAll = await Promise.all([promiseProductTrial, promiseProductTraditional, promiseProductForStore, promiseProductConvenient, promiseProductZili])
    const [productTrial, productTraditional, productForStore, productConvenient, productZili] = promiseAll
    const totalRecord = promiseAll.reduce((total: number, item: any) => {
      return (total = +total + +item.data.totalRecords)
    }, 0)

    return {
      props: {
        productTrial: productTrial.data?.products,
        productTraditional: productTraditional.data?.products,
        productForStore: productForStore.data?.products,
        productConvenient: productConvenient.data?.products,
        productZili: productZili.data?.products,
        totalRecord: totalRecord
      }
    }
  }
}
