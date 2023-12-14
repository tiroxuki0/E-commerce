import Image from "next/image"
import Link from "next/link"
import React from "react"

const Logo = () => {
  return (
    <Link href="/" className="flex-shrink-0">
      <a className="block md:flex items-center justify-center md:w-[115px] md:h-[70px] w-[85px] h-[51px] relative">
        <Image
          src="/images/logo.svg"
          alt="zili-logo"
          objectFit="contain"
          layout="fill"
          className="cursor-pointer md:ltr:-mr-3 flex-shrink-0"
        />
      </a>
    </Link>
  )
}

export default Logo
