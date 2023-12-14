/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "en",
    localeDetection: false,
  },
  images: {
    domains: [process.env.MEDIA_DOMAIN || 'media.zili.vn', process.env.IMAGE_URL || 'zili.sgp1.digitaloceanspaces.com'],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    IMAGE_URL: process.env.IMAGE_URL,
    WEBSITE_KEY: process.env.WEBSITE_KEY,
    MEDIA_DOMAIN: process.env.MEDIA_DOMAIN,
    ENVIRONMENT: process.env.ENVIRONMENT,
    SITE_URL: process.env.SITE_URL,
    SHOP_CART_STORE: process.env.SHOP_CART_STORE
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "[name].[ext]",
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;
