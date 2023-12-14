import React from "react"
import Head from "next/head"
import { ThemeProvider } from "next-themes"
import Header from "./header"
import Footer from "./footer"
import BottomNavigationBar from "./bottom-navigation-bar"
import Navigation from "./navigation"
import RegisterMail from "./register-mail"
import { ToastContainer } from "react-toastify"
import { Toaster } from "react-hot-toast"
import NextNProgress from "nextjs-progressbar"
import { useRouter } from "next/router"
import {useLanguage} from "hooks/useLanguage"

const Layout: React.FC<{ children?: React.ReactNode, isDetailScreen: boolean }> = ({ children, isDetailScreen = false }) => {
  const router = useRouter()
  const {t} = useLanguage()
  const isSocialPage = router.pathname.includes("/facebook") || router.pathname.includes("/google")

  return (
      <ThemeProvider enableSystem={true} attribute="class">
        <Head>
          <title>{t.defaultTitle}</title>
        </Head>
        <div className="flex flex-col min-h-[100vh]">
          <NextNProgress color="#346448" height={6} />
          {!isSocialPage ? (
              <>
                <Navigation />
                <Header isDetailScreen={isDetailScreen}/>
                <main className="flex-grow">{children}</main>
                <RegisterMail />
                <Footer />
                {
                    !isDetailScreen && <BottomNavigationBar />
                }
              </>
          ) : <main className="flex-grow">{children}</main>}
        </div>
        <Toaster position="top-right" reverseOrder={false} />
        <ToastContainer autoClose={2000} hideProgressBar={true} rtl={false} position={"top-right"} />
      </ThemeProvider>
  )
}

export default Layout
