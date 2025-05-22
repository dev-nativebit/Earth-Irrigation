

export interface ExpTypeDto {
  exp_prefix: string
  exp_no: string
  exp_number: string
  expTypeList: ExpTypeListDto[]
  travelBy:string[]
}



export interface ExpTypeListDto {
  id: string
  label: string
  type: string
  remark: string
  is_travel: string
  bike_expense: string
  car_expense: string
  image_required: string
  created_at: string
  created_by: string
  updated_at: string
  updated_by: string
  is_delete: string
  cm_id: string
}
