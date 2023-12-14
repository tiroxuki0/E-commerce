/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'bottom-navbar': '0 0 4px 0 rgba(0, 0, 0, 0.25)',
        'navigation': '0 0 3px 0 rgba(0, 0, 0, 0.25)',
        'mega-menu': '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
        'slide-item': '0 0 5px 0 rgba(0, 0, 0, 0.5)',
        'filter': '0 3px 4px 0 rgba(0, 0, 0, 0.25)',
        'header': '0 3px 2px 0 rgba(0, 0, 0, 0.25)',
        'header-desktop': '0 2px 5px 0 rgba(0, 0, 0, 0.15)'
      },
      dropShadow: {
        'navigation': '0px 0px 5px rgba(0, 0, 0, 0.6)'
      },
      colors: {
        primary: "var(--color-primary)"
      },
      backgroundColor: {
        palette: {
          digitalCategory: "var(--digital-category-bgc)",
          fashionCategory: "var(--fashion-category-bgc)",
          beautyCategory: "var( --beauty-category-bgc)",
          sportCategory: "var(--sport-category-bgc)",
          houseCategory: "var(--house-category-bgc)",
          toyCategory: "var(--toy-category-bgc)",
          stationeryCategory: "var(--stationery-category-bgc)"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        "svn-gilroy": ["SVN Gilroy", "Inter", "system-ui", "sans-serif"]
      },
      keyframes: {
        sidenavLTR: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0px)" }
        },
        sidenavRTL: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0px)" }
        },
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        dropDown: {
          "0%": { opacity: 0, transform: "scaleY(0)" },
          "100%": { opacity: 1, transform: "scaleY(1)" }
        }
      },
      animation: {
        sidenavLTREntering: "sidenavLTR 0.3s ease-in-out forwards",
        sidenavRTLEntering: "sidenavRTL 0.3s ease-in-out forwards",
        sidenavLTRExit: "sidenavLTR 0.3s ease-in-out reverse forwards",
        sidenavRTLExit: "sidenavRTL 0.3s ease-in-out reverse forwards",
        fadeEntering: "fade 0.3s forwards",
        fadeExit: "fade 0.3s reverse forwards",
        dropDown: "dropDown 0.3s forwards",
        dropDownExit: "dropDown 0.3s reverse forwards"
      },
      backgroundImage: {
        offersBG: "url('/images/carouselBox-bg/offersbg.webp')"
      }
    }
  },
  plugins: [
    require("tailwindcss-font-inter")({
      // Specify the SVN-Gilroy font from Google Fonts
      importFontFace: true,
      customFontPath: "/fonts/",
      fontFormats: ["woff2"],
      fontWeights: [400, 500, 600],
      fontDisplay: "swap",
      fontFamily: "SVN Gilroy",
      fontFaces: [
        {
          fontFamily: "SVN Gilroy",
          fontFilePath: "https://fonts.gstatic.com/s/svngilroy/v14/5JwZ6FVvSjrbX9a9NiYgBBEAvth_LlrfE80S.ttf",
          fontFormats: ["woff2"],
          fontWeight: "400",
          fontDisplay: "swap"
        },
        {
          fontFamily: "SVN Gilroy",
          fontFilePath: "https://fonts.gstatic.com/s/svngilroy/v14/5JwZ6FVvSjrbX9a9NiYgBBEAvth_LlrfEk4S.ttf",
          fontFormats: ["woff2"],
          fontWeight: "500",
          fontDisplay: "swap"
        },
        {
          fontFamily: "SVN Gilroy",
          fontFilePath: "https://fonts.gstatic.com/s/svngilroy/v14/5JwZ6FVvSjrbX9a9NiYgBBEAvth_LlrfHk8S.ttf",
          fontFormats: ["woff2"],
          fontWeight: "600",
          fontDisplay: "swap"
        }
      ]
    })
  ]
}
