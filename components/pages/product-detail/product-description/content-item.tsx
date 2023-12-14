import React, {memo, useRef, useState} from "react"
import { Transition } from "react-transition-group"
import {PRODUCT_IMAGE_DETAIL_MODEL} from "models/product.model"
import Image from "next/image"
import {replaceUrlImage} from "helpers/base.helper"

interface Props {
    title: string
    defaultStatus?: boolean
    description: string
    images?: Array<PRODUCT_IMAGE_DETAIL_MODEL>
}

const ContentItem = (
    {
        title = '',
        description = '',
        defaultStatus = false,
        images = []
    }: Props) => {
    const [isShowDescription, setIsShowDescription] = useState(defaultStatus)
    const descriptionRef = useRef<HTMLDivElement>(null)

    const handleToggleDescription = () => setIsShowDescription(!isShowDescription)

    return (
        <div className="w-full mt-[15px]">
            <h4 onClick={handleToggleDescription}
                className="uppercase text-title cursor-pointer flex items-center justify-between lg:px-[10px] py-[13px] font-[500] box-border border-y-primary"
            >
                <span className="text-[16px]">{title}</span>
                <span className="lg:text-[23px] text-[16px]">
                        {isShowDescription ? '-' : '+'}
                    </span>
            </h4>
            <Transition nodeRef={descriptionRef}
                        timeout={500}
                        unmountOnExit
                        mountOnEnter
                        in={isShowDescription}>
                <>
                    <div className="text-primary text-[14px] font-[500] lg:px-[10px] lg:py-[15px] py-[10px]"
                         dangerouslySetInnerHTML={{__html: description}}/>
                    {
                        (images && images.length > 0) &&
                        images.map((image, index) => {
                            return (
                                <div key={index} className="w-full relative lg:h-[500px] h-[250px] my-[20px]">
                                    <Image src={replaceUrlImage(image.image_url)}
                                           layout="fill"
                                           objectFit="contain"
                                           alt="productDescription"/>
                                </div>
                            )
                        })
                    }
                </>
            </Transition>
        </div>
    )
}

export default memo(ContentItem)
