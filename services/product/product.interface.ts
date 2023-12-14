export interface IReqProductByCategory {
  loai: string;
  "trang-thai": number;
  loc?: string;
  tu?: number;
  den?: number;
}
export interface IReqProducts {
  tu?: number;
  den?: number;
}