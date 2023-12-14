<div id='top' align="center">

![Zili coffee](public/images/logo.svg)

## 🔧Technologies
![React](https://img.shields.io/badge/-React-05122A?style=for-the-badge&logo=react)&nbsp;
![TypeScript](https://img.shields.io/badge/-TypeScript-05122A?style=for-the-badge&logo=typescript)&nbsp;
![Next.js](https://img.shields.io/badge/-Next.js-05122A?style=for-the-badge&logo=next.js)&nbsp;
![Redux](https://img.shields.io/badge/-Redux-05122A?style=for-the-badge&logo=redux&logoColor=764ABC)&nbsp;
![Tailwind CSS](https://img.shields.io/badge/-TailwindCSS-05122A?style=for-the-badge&logo=tailwindCSS&logoColor=06B6D4)

## 🚀Getting Started
1. Clone the project
  ```bash
  git clone https://github.com/ZahraMirzaei/online-shop.git
  ```
2. Install project dependencies
  ```bash
  npm install
  #or
  yarn add
  ```
3. Enter your `projectId` into `lib/client.ts`
4. Add `.env` file to root project, and enter your `token` into `.env`
  ```js
  NEXT_PUBLIC_SANITY_TOKEN= [ENTER YOUR TOKEN]
  ```
5. Go to sanity_onlineshop folder and open new terminal in this path, then
  ```bash
  sanity start
  ```
open `http://localhost:3333` and enter products.
 
6. Run the development server in project root path:

  ```bash
  npm run dev
  # or
  yarn dev
  ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.