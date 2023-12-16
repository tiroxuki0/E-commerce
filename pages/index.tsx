import BannerTop from "components/common/banners/banner-top"
import { useEffect, useState } from "react"
import { PAGE_COMPONENT_MODEL } from "models/page-component.model"
import useDeviceDetect from "hooks/useDeviceDetect"
import { PRODUCT_MODEL } from "models/product.model"
import Introduction from "components/pages/home/introduction"
import ListCard from "components/pages/home/list-card"
import SendCard from "components/pages/home/send-card"

interface HomeProps {
  data: PAGE_COMPONENT_MODEL
  productsBest: Array<PRODUCT_MODEL>
  productsIntroduce: Array<PRODUCT_MODEL>
}

const Home = (props: HomeProps) => {
  const currentDevice = useDeviceDetect()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(currentDevice.isMobile())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <BannerTop isMobile={isMobile} />
      <Introduction />
      <SendCard />
      <ListCard />
    </>
  )
}

export default Home
