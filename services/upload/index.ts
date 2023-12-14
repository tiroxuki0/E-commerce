import { ROUTE_API } from "constants/route-api.contant"
import API from "configs/api/repository-api"
import {
  resUploadImages,
  resUploadVideo
} from "./upload.type"
import {IReqUploadImages, IReqUploadVideo} from "./upload.interface"

const url = ROUTE_API.upload
const urlImages = ROUTE_API.images
const urlVideo = ROUTE_API.video

export const uploadMultiImageService = async (payload: IReqUploadImages): Promise<any> => {
  return (await API.postFormData(`${url}/${urlImages}`, { body: {...payload} })) as Promise<resUploadImages>
}

export const uploadVideoService = async (payload: IReqUploadVideo): Promise<any> => {
  return (await API.postFormData(`${url}/${urlVideo}`, { body: {...payload} })) as Promise<resUploadVideo>
}
