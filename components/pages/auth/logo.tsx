import Image from "next/image"
import Link from "next/link"
import React from "react"

const Logo = () => {
  return (
    <Link href="/" className="flex-shrink-0">
      <a className="relative flex items-center justify-center">
        <Image
          src="/images/logo.svg"
          alt="zili-logo"
          width={185}
          height={90}
          objectFit="contain"
          className="cursor-pointer md:ltr:-mr-3 flex-shrink-0"
        />
      </a>
    </Link>
  )
}

export default Logo
