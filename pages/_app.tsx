import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"

import Layout from "../components/layout"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import "react-toastify/dist/ReactToastify.css"

import "../styles/globals.scss"
import '../styles/slide.scss'
import '../styles/pages.css'
import '../styles/rating.scss'
import '../styles/pagination.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout isDetailScreen={pageProps.isDetailScreen}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
