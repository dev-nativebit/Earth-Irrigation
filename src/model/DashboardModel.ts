import {Model} from '@/model/core';
import {DashboardDto} from '@/dtos';

export class DashboardModel extends Model<DashboardDto>{
  constructor(dto:DashboardDto) {
    super(dto);
  }

  get baners(): string[]{
    return this.dto?.baners ?? []
  }
  get present():number{
    return this.dto?.present ?? ''
  }
  get visits():number{
    return this.dto?.visits ?? ''
  }
  get approved_Expense():number{
    return this.dto?.approved_Expense ?? ''
  }
  get unapproved_Expense():number{
    return this.dto?.unapproved_Expense ?? ''
  }
}
