import {BaseAction} from ".."
import {State} from "./index"
import {getReviewsByProductService, createProductReviewService} from "services/product-review"
import {RES_PRODUCT_REVIEWS_BY_PRODUCT_MODEL} from "models/product-review.model"
import {PRODUCT_MEDIA_MODEL} from "models/product.model"
import {IReqReviewProduct} from "services/product-review/product-review.interface"
import {notifyError, notifySuccess} from "helpers/toast.helper"
import {uploadMultiImageService, uploadVideoService} from "services/upload"
import {LANGUAGE} from "constants/base.constant"

type Actions = BaseAction<State>

export const handleSelectStarFilter = (star: number | null) => {
  return async (actions: Actions) => {
    const params = {
      ...actions.getState().filter,
      totalStar: actions.getState().filter.totalStar === star ? null : star
    }
    const productId = actions.getState().productId
    if (!productId) return
    const res = await getReviewsByProductService(productId, params)
    actions.setState({
      ...actions.getState(),
      filter: params,
      reviewsByProduct: res?.data || []
    })
  }
}

export const handleSelectTypeFilter = (type: string | null) => {
  return async (actions: Actions) => {
    const params = {
      ...actions.getState().filter,
      type: type
    }
    const productId = actions.getState().productId
    if (!productId) return
    const res = await getReviewsByProductService(productId, params)
    actions.setState({
      ...actions.getState(),
      filter: params,
      reviewsByProduct: res?.data || []
    })
  }
}

export const handleSelectPage = (page: number) => {
  return async (actions: Actions) => {
    const params = {
      ...actions.getState().filter,
      page: page
    }
    const productId = actions.getState().productId
    if (!productId) return
    const res = await getReviewsByProductService(productId, params)
    actions.setState({
      ...actions.getState(),
      filter: params,
      reviewsByProduct: res?.data || []
    })
  }
}

export const setProductReviewsByProduct = (productId: string, reviewsData: RES_PRODUCT_REVIEWS_BY_PRODUCT_MODEL) => {
  return (actions: Actions) => {
    actions.setState({
      ...actions.getState(),
      productId: productId,
      reviewsByProduct: reviewsData
    })
  }
}

export const handleSelectedReviewMedia = (mediaList: PRODUCT_MEDIA_MODEL[], index: number) => {
  return (actions: Actions) => {
    actions.setState({
      ...actions.getState(),
      reviewMediaActiveIndex: index,
      reviewMediaList: mediaList
    })
  }
}

export const handleSelectedFlavor = (flavor: {en: string, vi: string}, locale: LANGUAGE) => {
  return (actions: Actions) => {
    let flavors = actions.getState()?.bodyReview?.flavors || []
    const existFlavorIndex = flavors?.findIndex((item: any) => item[locale] === flavor[locale]) || -1
    if (existFlavorIndex > -1) {
      flavors?.splice(existFlavorIndex, 1)
    } else {
      flavors.push(flavor)
    }
    actions.setState({
      ...actions.getState(),
      bodyReview: {
        ...actions.getState()?.bodyReview,
        flavors: [...flavors]
      }
    })
  }
}

export const handleSelectedType = (type: {en: string, vi: string}) => {
  return (actions: Actions) => {
    actions.setState({
      ...actions.getState(),
      bodyReview: {
        ...actions.getState()?.bodyReview,
        type: type
      }
    })
  }
}

export const handleRemoveImage = (index: number) => {
  return (actions: Actions) => {
    const images = actions.getState()?.bodyReview?.images || []
    images?.splice(index, 1)
    actions.setState({
      ...actions.getState(),
      bodyReview: {
        ...actions.getState()?.bodyReview,
        images: [...images]
      }
    })
  }
}

export const setVideo = (video: Blob | null) => {
  return (actions: Actions) => {
    actions.setState({
      ...actions.getState(),
      bodyReview: {
        ...actions.getState()?.bodyReview,
        video: video
      }
    })
  }
}

export const setRating = (rating: number) => {
  return (actions: Actions) => {
    actions.setState({
      ...actions.getState(),
      bodyReview: {
        ...actions.getState()?.bodyReview,
        totalStar: rating
      }
    })
  }
}

export const handleSelectedImages = (files: Blob[]) => {
  return (actions: Actions) => {
    actions.setState({
      ...actions.getState(),
      bodyReview: {
        ...actions.getState()?.bodyReview,
        images: [...actions.getState()?.bodyReview?.images || [], ...files]
      }
    })
  }
}

export const handleReviewProduct = (data: IReqReviewProduct, t: {[key: string]: string}, handleSuccess: () => void) => {
  return async (actions: Actions) => {
    const body = actions.getState()?.bodyReview
    if (!body?.totalStar) return notifyError(t.ratingRequired)
    actions.setState({
      ...actions.getState(),
      isLoading: true
    })
    const images: string[] = []
    const videos: string[] = []
    if (body?.images && body.images?.length > 0) {
      const result = await uploadMultiImageService({images: body.images})
      if (result?.data && result?.data?.length > 0) {
        for (const item of result?.data) {
          images.push(item?.url)
        }
      }
    }
    if (body?.video) {
      const result = await uploadVideoService({video: body.video})
      if (result?.data) {
        videos.push(result?.data?.url)
      }
    }
    data.images = JSON.stringify(images)
    data.videos = JSON.stringify(videos)
    data.flavor = JSON.stringify(body.flavors)
    data.type = JSON.stringify(body.type)
    data.totalStar = body?.totalStar
    const result = await createProductReviewService(data)
    actions.setState({
      ...actions.getState(),
      bodyReview: {totalStar: 0},
      isLoading: false
    })
    if (result && result?.status) {
      notifySuccess(t.submitReviewSuccessfully)
      if (handleSuccess) handleSuccess()
    }
  }
}
