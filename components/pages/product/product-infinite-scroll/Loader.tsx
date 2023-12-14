// Loader.tsx
import { useLanguage } from "hooks/useLanguage"
import { UseInfiniteScroll } from "./useInfiniteScroll"

type LoaderProps = Pick<UseInfiniteScroll, "isLoading" | "loadMoreCallback" | "isLastPage">

const Loader = ({ isLoading, isLastPage, loadMoreCallback }: LoaderProps) => {
  const { t } = useLanguage()

  if (isLoading) return <p className="text-center text-[#346448] text-semibold py-[20px]">{`${t.loading}...`}</p>

  if (isLastPage) return null

  return <div ref={loadMoreCallback}>{t.loadMore}</div>
}

export default Loader
