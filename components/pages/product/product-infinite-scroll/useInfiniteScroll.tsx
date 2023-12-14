import { useEffect, useState, useRef, useCallback } from "react"
import { PRODUCT_MODEL } from "models/product.model"
import { getProductByCategoryService } from "services/product"
import { SCREEN_ITEM_STATUS } from "constants/page-component.constant"
import { LIMIT_ON_DETAIL } from "constants/product.constant"

export interface UseInfiniteScroll {
  isLoading: boolean
  loadMoreCallback: (el: HTMLDivElement) => void
  hasDynamicPosts: boolean
  dynamicPosts: Array<PRODUCT_MODEL>
  isLastPage: boolean
}

export const useInfiniteScroll = (category: string, filter: string): UseInfiniteScroll => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasDynamicPosts, setHasDynamicPosts] = useState(false)
  const [page, setPage] = useState(0)
  const [dynamicPosts, setDynamicPosts] = useState<Array<PRODUCT_MODEL>>([])
  const [isLastPage, setIsLastPage] = useState(false)
  const observerRef = useRef<IntersectionObserver>()
  
  const handleObserver = useCallback(
    async (entries: any[]) => {
      const target = entries[0]
      if (target.isIntersecting) {
        setIsLoading(true)
        const result = await getProductByCategoryService({ loai: category || "", tu: page, den: LIMIT_ON_DETAIL, loc: filter, "trang-thai": SCREEN_ITEM_STATUS.ACTIVE })

        if (result.data) {
          const newDynamicPosts = [...dynamicPosts, ...result.data.products]
          setPage(page + 1)
          setDynamicPosts(newDynamicPosts)
          setIsLastPage(newDynamicPosts?.length === result.data.totalRecords)
          setHasDynamicPosts(true)
          setIsLoading(false)
        }
      }
    },
      // eslint-disable-next-line react-hooks/exhaustive-deps
    [setIsLoading, dynamicPosts]
  )

  useEffect(() => {
    setDynamicPosts([])
    setIsLastPage(false)
    setPage(0)
    setHasDynamicPosts(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, filter])

  const loadMoreCallback = useCallback(
    (el: HTMLDivElement) => {
      if (isLoading) return
      if (observerRef.current) observerRef.current.disconnect()

      const option: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
      }
      observerRef.current = new IntersectionObserver(handleObserver, option)

      if (el) observerRef.current.observe(el)
    },
    [handleObserver, isLoading]
  )

  return {
    isLoading,
    loadMoreCallback,
    hasDynamicPosts,
    dynamicPosts,
    isLastPage
  }
}
