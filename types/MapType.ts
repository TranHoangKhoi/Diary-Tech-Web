export interface IMapItem {
  _id: string;
  owner_id: OwnerId;
  user_id: UserId;
  farm_name: string;
  location: string;
  farm_type_id: FarmTypeId;
  geo_location: number[];
  area: string;
  farm_status: string;
  description: string;
  avatar: string;
  province: Province;
  ward: Ward;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface OwnerId {
  _id: string;
  phone: string;
  name: string;
  avatar: string;
  role: string;
}

export interface UserId {
  _id: string;
  phone: string;
  name: string;
  avatar: string;
  role: string;
}

export interface FarmTypeId {
  _id: string;
  type_name: string;
  image: string;
  description: string;
}

export interface Province {
  id: string;
  province_code: string;
  name: string;
  short_name: string;
  code: string;
  place_type: string;
  country: string;
  created_at: any;
  updated_at: any;
}

export interface Ward {
  id: string;
  ward_code: string;
  name: string;
  province_code: string;
  created_at: any;
  updated_at: any;
}
