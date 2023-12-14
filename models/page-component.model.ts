export interface PAGE_COMPONENT_MODEL {
  readonly id: number;
  screen: string;
  website: string;
  is_public: number;
  items: Array<ITEM_MODEL>
}

export interface ITEM_MODEL {
  readonly id: number;
  title?: string;
  screen?: string;
  setting_screen?: string;
  desktop_name?: string;
  mobile_name?: string;
  sub_desktop_name?: string;
  sub_mobile_name?: string;
  description?: string;
  desktop_url?: string;
  mobile_url?: string;
  image_url?: string;
  url?: string;
  thumb_desktop_url?: string;
  thumb_mobile_url?: string;
  thumb_image_url?: string;
  position?: string;
  mobile_description?: string;
  item_details?: Array<ITEM_DETAILS_MODEL>
}

export interface ITEM_DETAILS_MODEL {
  readonly id: number;
  position: number;
  desktop_url?: string;
  mobile_url?: string;
  image_url?: string;
  thumb_image_url?: string;
  thumb_desktop_url?: string;
  thumb_mobile_url?: string;
  link_url?: string;
  name?: string;
  name1?: string;
  description?: string;
}