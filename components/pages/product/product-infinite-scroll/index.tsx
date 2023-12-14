import { memo } from "react"
import { useInfiniteScroll } from "./useInfiniteScroll"
import InfiniteScroll from "./InfiniteScroll"
import { useRouter } from "next/router"

const ProductInfiniteScroll = () => {
  const router = useRouter()
  const category = router.query.category as string
  const filter = router.query.filter as string
  const { isLoading, loadMoreCallback, dynamicPosts, isLastPage } = useInfiniteScroll(category, filter)

  return <InfiniteScroll products={dynamicPosts} isLoading={isLoading} loadMoreCallback={loadMoreCallback} isLastPage={isLastPage} />
}

export default memo(ProductInfiniteScroll)
