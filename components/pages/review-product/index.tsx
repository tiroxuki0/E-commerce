import React, {memo, useEffect} from "react"
import Image from "next/image"
import {RatingStar} from "rating-star"
import {useForm} from "react-hook-form"
import {FiPlus, FiXCircle} from "react-icons/fi"
import Dropzone from "react-dropzone"
import {useLanguage} from "hooks/useLanguage"
import {useProduct} from "stores/product"
import {useAuth} from "stores/auth"
import {useProductReview} from "stores/product-review"
import {replaceUrlImage} from "helpers/base.helper"
import {DEFAULT_LANGUAGE, LANGUAGE, LIMIT_IMAGE, LIMIT_VIDEO} from "constants/base.constant"
import {PRODUCT_FLAVORS, PRODUCT_TYPES} from "constants/product.constant"
import Loading from "components/common/loading"
import {useRouter} from "next/router"

const styleInput = 'box-border bg-white placeholder:text-gray text-[14px] font-[500] lg:py-[15px] py-[10px] lg:px-[22px] px-[14px] w-full rounded-[10px] border border-black'

const ReviewProduct = () => {
    const {t, locale} = useLanguage()
    const language = locale || DEFAULT_LANGUAGE
    const [storeProduct] = useProduct()
    const [storeReview, actionReview] = useProductReview()
    const [storeUser] = useAuth()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setValue,
        reset
    } = useForm()

    useEffect(() => {
        if (storeUser?.userData?.id) {
            setValue('name', storeUser?.userData?.name)
            setValue('email', storeUser?.userData?.email)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeUser?.userData])

    const handleSuccess = () => {
        reset()
        router.back()
    }

    const onSubmit = async (values: any) => {
        const data: any = {
            message: values.feedback,
            product_id: storeProduct.product?.id
        }
        if (!storeUser.userData?.id) {
            data.name = values.name
            data.email = values.email
        }
        await actionReview.handleReviewProduct(data, t, handleSuccess)
    }

    const renderImages = (images: Blob[]) => {
        if (images && images.length > 0) {
            return images.map((image, index: number) => {
                return (
                    <div className="relative w-[90px] h-[90px] border border-black rounded-common my-[10px] mr-[15px]" key={index}>
                        <Image src={URL.createObjectURL(image) || ''}
                               layout="fill"
                               objectFit="cover"
                               className="rounded-common overflow-hidden"
                               alt="reviewImage"/>
                        <FiXCircle className="cursor-pointer absolute top-[-8px] right-[-8px] bg-white rounded-full z-[2]"
                                   onClick={() => actionReview.handleRemoveImage(index)}
                                   size={20}/>
                    </div>
                )
            })
        }
        return <></>
    }

    return (
        <div className="lg:bg-body lg:pt-[66px] pt-[32px] lg:pb-[50px] pb-0">
            {
                storeReview.isLoading && <Loading />
            }
            <div className="container lg:bg-body">
                <div className="lg:mx-[149px] lg:px-[42px] bg-white">
                    <h2 className="text-center uppercase lg:pt-[39px] text-title text-[23px] font-[600]">{t.productReview}</h2>
                    <div className="grid grid-cols-[80px_1fr] items-center lg:mt-0 mt-[30px]">
                        <div className="overflow-hidden rounded-[10px] bg-product border flex">
                            <Image src={replaceUrlImage(storeProduct.product?.image_base_url || storeProduct.product?.product_media?.[0]?.url || "")}
                                   width={80}
                                   height={80}
                                   objectFit="cover"
                                   alt={storeProduct.product?.name_display || ''}
                            />
                        </div>
                        <div className="lg:pl-[23px] pl-[19px]">
                            <h3 className="text-[16px] text-black uppercase font-[600] mb-[9px]">{storeProduct.product?.name_display || storeProduct.product?.name || ""}</h3>
                            <RatingStar id="productRating"
                                        rating={storeReview.bodyReview?.totalStar}
                                        clickable
                                        colors={{mask: 'var(--color-star)', rear: '#ffffff'}}
                                        maxScore={5}
                                        numberOfStar={5}
                                        onRatingChange={actionReview.setRating}
                                        size={28}/>
                        </div>
                    </div>
                    <form className="mt-[41px] w-full" onSubmit={handleSubmit(onSubmit)}>
                        <textarea id="feedback"
                                  {...register('feedback')}
                                  cols={30}
                                  className={styleInput}
                                  placeholder={t.opinionOnTheProductZiliCoffee}
                                  rows={10} />
                        {
                            !storeUser.userData?.id &&
                            <div className="grid grid-cols-2 gap-[26px] mt-[19px]">
                                <input type="text"
                                       className={styleInput}
                                       {...register('name', {required: true, onBlur: (e) => setValue('name', e.target?.value)})}
                                       disabled={!!storeUser.userData?.id}
                                       placeholder={`${t.yourName} *`}/>
                                <input type="text"
                                       className={styleInput}
                                       {...register('email', {required: true, onBlur: (e) => setValue('email', e.target?.value)})}
                                       disabled={!!storeUser.userData?.id}
                                       placeholder={`${t.emailAddress} *`}/>
                            </div>
                        }
                        <div className="mt-[26px]">
                            <div className="flex items-center flex-wrap px-[10px] rounded-[10px] bg-media-review">
                                {
                                    renderImages(storeReview.bodyReview?.images || [])
                                }
                                {
                                    (!storeReview.bodyReview?.images || storeReview.bodyReview?.images?.length < LIMIT_IMAGE) &&
                                    <div className="relative w-[90px] h-[90px] my-[10px]">
                                        <div className="flex flex-col bg-white items-center justify-center border border-black rounded-common w-full h-full">
                                            <FiPlus size={20}/>
                                            <span className="mt-[4px] text-[14px]">{t.addImage}</span>
                                        </div>
                                        <Dropzone accept={{"image/*": [".png", ".gif", ".jpeg", ".jpg"]}}
                                                  maxFiles={LIMIT_IMAGE - (storeReview.bodyReview?.images?.length || 0)}
                                                  onDropAccepted={actionReview.handleSelectedImages}
                                        >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps({className: "w-full h-full absolute top-0 left-0"})}>
                                                    <input {...getInputProps()}/>
                                                </div>
                                            )}
                                        </Dropzone>
                                    </div>
                                }
                            </div>
                            <div className="flex items-center flex-wrap px-[10px] rounded-[10px] bg-media-review mt-[20px]">
                                {
                                    storeReview.bodyReview?.video &&
                                    <div className="relative w-[90px] h-[90px] border border-black rounded-common my-[10px] mr-[15px]">
                                        <video src={URL.createObjectURL(storeReview.bodyReview?.video)}
                                               muted
                                               autoPlay
                                               className="rounded-common overflow-hidden w-full h-full object-cover"
                                        />
                                        <FiXCircle className="cursor-pointer absolute top-[-8px] right-[-8px] bg-white rounded-full z-[2]"
                                                   onClick={() => actionReview.setVideo(null)}
                                                   size={20}/>
                                    </div>
                                }
                                {
                                    !storeReview.bodyReview?.video &&
                                    <div className="relative w-[90px] h-[90px] my-[10px]">
                                        <div className="flex flex-col bg-white items-center justify-center border border-black rounded-common w-full h-full">
                                            <FiPlus size={20}/>
                                            <span className="mt-[4px] text-[14px]">{t.addVideo}</span>
                                        </div>
                                        <Dropzone accept={{'video/mp4': ['.mp4', '.MP4']}}
                                                  maxFiles={LIMIT_VIDEO}
                                                  onDrop={(files) => actionReview.setVideo(files[0])}
                                        >
                                            {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps({className: "w-full h-full absolute top-0 left-0"})}>
                                                    <input {...getInputProps()}/>
                                                </div>
                                            )}
                                        </Dropzone>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <h4 className="text-[16px] font-[600] mb-[9px]">{t.flavor}</h4>
                            {
                                PRODUCT_FLAVORS?.length &&
                                PRODUCT_FLAVORS.map((flavor, index) => {
                                    const active = storeReview.bodyReview?.flavors?.find((item: any) => item[language] === flavor[language])?.[language]
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            onClick={() => actionReview.handleSelectedFlavor(flavor, language as LANGUAGE)}
                                            className={`p-[11px] border-primary font-[600] text-[14px] rounded-common leading-[1.25] mr-[12px] ${active ? 'bg-primary text-white' : 'bg-white text-primary'}`}
                                        >{flavor[language]}</button>
                                    )
                                })
                            }
                            <h4 className="text-[16px] font-[600] mt-[20px] mb-[9px]">{t.form}</h4>
                            {
                                PRODUCT_TYPES?.length &&
                                PRODUCT_TYPES.map((productType, index) => {
                                    const active = storeReview.bodyReview?.type?.[language] === productType[language]
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            onClick={() => actionReview.handleSelectedType(productType)}
                                            className={`p-[11px] border-primary font-[600] text-[14px] rounded-common leading-[1.25] mr-[12px] ${active ? 'bg-primary text-white' : 'bg-white text-primary'}`}
                                        >{productType[language]}</button>
                                    )
                                })
                            }
                        </div>
                        <div className="lg:mt-[87px] mt-[48px] lg:pb-[49px] pb-[24px] flex items-center justify-center">
                            <button className="btn-primary capitalize text-primary rounded-[10px] py-[13px] lg:w-[41.1596958175%] w-full"
                                    disabled={storeReview.isLoading}
                                    type="submit"
                            >
                                {t.submitReview}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default memo(ReviewProduct)
