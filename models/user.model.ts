export interface USER_MODEL {
  avatar?: string  
  avatar_thumb?: string 
  coin?: number 
  createdAt?: string 
  customer_addresses?: object | []
  customer_like_products?: object | []
  customer_seen_products?: object | []
  delete_flag?: number 
  deletedAt?: string 
  dob?: string 
  email: string 
  fbId?: string 
  gender?: number 
  googleId?: string 
  id?: string 
  is_auth?: boolean
  is_payment?: boolean
  name?: string 
  note?: string 
  phone?: string 
  referral_code?: string 
  refresh_token?: string 
  sapo_customer_id?: string 
  status?: string 
  updatedAt?: string 
  username?: string 
  verifyOTP: string 
}
