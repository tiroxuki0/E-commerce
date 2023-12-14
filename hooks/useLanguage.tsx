import { useRouter } from "next/router"
import en from "locales/en"
import vi from "locales/vi"
import {DEFAULT_LANGUAGE} from "constants/base.constant"

export const useLanguage = () => {
  const { locale } = useRouter()
  const t = locale === DEFAULT_LANGUAGE ? en : vi
  return { t, locale }
}
