export interface IActivities {
  _id: string;
  farm_type_id: string;
  activity_name: string;
  image: string;
  description: string;
  fields: IField[];
  created_at?: string;
  updated_at?: string;
}

export interface IField {
  field_name: string;
  field_type: string;
  is_required: boolean;
  options: string[];
  _id?: string;
}
