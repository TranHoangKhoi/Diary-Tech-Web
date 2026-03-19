export interface IProvince {
  id: string;
  province_code: string;
  name: string;
  short_name: string;
  code: string;
  place_type: string;
  country: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface IWard {
  id: string;
  ward_code: string;
  name: string;
  province_code: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface IFarm {
  _id: string;
  owner_id: string;
  user_id: string;
  farm_name: string;
  location: string;
  farm_type_id: {
    type_name: string;
    _id: string;
  };
  geo_location?: number[];
  area: string;
  soil_type?: string;
  farm_status: "active" | "inactive" | "under_maintenance";
  description?: string;
  avatar: string;
  province: IProvince;
  ward: IWard;
  created_at: string;
  updated_at: string;
}
