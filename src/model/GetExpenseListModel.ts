import {Entity} from '@/model/core';
import {GetExpenseListDto} from '@/dtos';

export class GetExpenseListModel extends Entity<GetExpenseListDto>{
  constructor(dto:GetExpenseListDto) {
    super(dto,'id');
  }

  get expenseId(): string{
    return this.dto?.id ?? ''
  }
  get emp_name(): string{
    return this.dto?.emp_name ?? ''
  }
  get exp_number(): string{
    return this.dto?.exp_number ?? ''
  }
  get exp_date(): string{
    return this.dto?.exp_date ?? ''
  }
  get notes(): string{
    return this.dto?.notes ?? ''
  }
  get demand_amount(): string{
    return this.dto?.demand_amount ?? ''
  }
  get pay_mode(): string{
    return this.dto?.pay_mode ?? ''
  }
  get amount(): string{
    return this.dto?.amount ?? ''
  }
  get approved_by(): string{
    return this.dto?.approved_by ?? ''
  }
}
