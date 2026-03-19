import { Province, Ward } from "./MapType";

// Thông tin farm cơ bản
export interface FarmId {
  _id: string;
  owner_id: {
    _id: string;
    phone: string;
    name: string;
    avatar: string;
    role: string;
  };
  user_id: {
    _id: string;
    phone: string;
    name: string;
    avatar: string;
    role: string;
  };
  farm_name: string;
  location: string;
  farm_type_id: string;
  geo_location: number[];
  farm_status: string;
  description: string;
  avatar: string;
  province: Province;
  ward: Ward;
  area?: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface ActivityId {
  _id: string;
  farm_type_id: FarmTypeId;
  activity_name: string;
  description: string;
  fields: Field[];
  created_at: string;
  updated_at: string;
  __v: number;
  image: string;
}

export interface FarmTypeId {
  _id: string;
  type_name: string;
  description: string;
  created_at: string;
  updated_at: string;
  __v: number;
  image: string;
}

export interface Field {
  field_name: string;
  field_type: string;
  is_required: boolean;
  options: any[];
  _id: string;
}

export interface CreatedBy {
  _id: string;
  phone: string;
  name: string;
  avatar: string;
}
export interface BookId {
  _id: string;
  farm_id: string;
  farm_type_id: string;
  name: string;
  production: string;
  description: string;
  image: string;
  start_date: string;
  end_date: string;
  status: string;
  created_by: string;
  general_info: GeneralInfo;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GeneralInfo {
  farm_name: string;
  farm_code: string;
  area: string;
  address_tinh: string;
  address_xa: string;
  gps: number[];
  farmer_name: string;
  phone: string;
}

// Production log chính
export interface IProductionLog {
  _id: string;
  farm_id: FarmId;
  activity_id: ActivityId;
  date: string;
  book_id: BookId;
  data: Record<string, any>; // 👈 form động
  notes: string;
  created_by: CreatedBy;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface IIProductionLogRecentOwner {
  id: string;
  type: string;
  message: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  farm: {
    id: string;
    name: string;
    avatar: string;
  };
  created_at: string;
}
