export interface IUserProfile {
  _id: string;
  phone: string;
  name: string;
  address: string;
  des: string;
  avatar: string;
  gender: number;
  role: string;
  status: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  __v: number;
  subscriptions: Subscription[];
}

export interface Subscription {
  _id: string;
  user_id: string;
  module_id: ModuleId;
  package_id: PackageId;
  start_date: string;
  end_date: string;
  status: string;
  remaining_sub_accounts: number;
  __v: number;
}

export interface ModuleId {
  _id: string;
  key: string;
  name: string;
  description: string;
}

export interface PackageId {
  _id: string;
  name: string;
  max_sub_accounts: number;
  price_per_month: number;
  duration_in_days: number;
}
