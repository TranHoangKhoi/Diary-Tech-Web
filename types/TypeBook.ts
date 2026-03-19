export interface IProductionBook {
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
}
