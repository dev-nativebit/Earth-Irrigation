import {Entity} from '@/model/core';
import {ExpTypeListDto} from '@/dtos/ExpTypeListDto';

export class ExpTypeListModel extends Entity<ExpTypeListDto>{
  constructor(dto:ExpTypeListDto) {
    super(dto,'id');
  }

  get ExpId(): string{
    return this.dto?.id ?? ''
  }
  get label(): string{
    return this.dto?.label ?? ''
  }
  get type(): string{
    return this.dto?.type ?? ''
  }
  get remark(): string{
    return this.dto?.remark ?? ''
  }
  get is_travel(): string{
    return this.dto?.is_travel ?? ''
  }
  get bike_expense(): string{
    return this.dto?.bike_expense ?? ''
  }
  get car_expense(): string{
    return this.dto?.car_expense ?? ''
  }
  get image_required(): string{
    return this.dto?.image_required ?? ''
  }
  get created_at(): string{
    return this.dto?.created_at ?? ''
  }
  get created_by(): string{
    return this.dto?.created_by ?? ''
  }
  get updated_at(): string{
    return this.dto?.updated_at ?? ''
  }
  get updated_by(): string{
    return this.dto?.updated_by ?? ''
  }
  get is_delete(): string{
    return this.dto?.is_delete ?? ''
  }
  get cm_id(): string{
    return this.dto?.cm_id ?? ''
  }
}