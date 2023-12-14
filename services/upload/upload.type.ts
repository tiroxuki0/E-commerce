import { ReturnResponse } from 'configs/api/response.interface'
import { UPLOAD_IMAGES_MODEL, UPLOAD_VIDEO_MODEL } from "models/upload.model"

export type resUploadImages = ReturnResponse<UPLOAD_IMAGES_MODEL>
export type resUploadVideo = ReturnResponse<UPLOAD_VIDEO_MODEL>