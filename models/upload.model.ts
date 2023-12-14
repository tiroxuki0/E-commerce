export interface UPLOAD_IMAGES_MODEL {
  status: boolean
  data: {
    mimetype: string
    originalname: string
    url: string
    filename: string
    file_thumb: string
    thumb_url: string
  }[]
  message: string
}

export interface UPLOAD_VIDEO_MODEL {
  status: boolean
  data: {
    mimetype: string
    originalname: string
    url: string
    filename: string
  }
  message: string
}