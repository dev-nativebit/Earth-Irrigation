import {Model} from "@/model/core";
import {EditExpenseDto} from "@/dtos";
import {ExpTranList} from "@/model/ExpTranList";

export class EditExpenseModel extends Model<EditExpenseDto>{
    constructor(dto: EditExpenseDto) {
        super(dto);
    }
   get id(): string{
       return this.dto?.id ?? ''
   }
   get exp_type(): string{
       return this.dto?.exp_type ?? ''
   }
   get exp_prefix(): string{
       return this.dto?.exp_prefix ?? ''
   }
   get exp_no(): string{
       return this.dto?.exp_no ?? ''
   }
   get exp_number(): string{
       return this.dto?.exp_number ?? ''
   }
   get exp_date(): string{
       return this.dto?.exp_date ?? ''
   }
   get exp_source(): string{
       return this.dto?.exp_source ?? ''
   }
   get exp_by_id(): string{
       return this.dto?.exp_by_id ?? ''
   }
   get proof_file(): string[]{
       return this.dto?.proof_file ?? []
   }
   get notes(): string{
       return this.dto?.notes ?? ''
   }
   get vehicle_type(): string{
       return this.dto?.vehicle_type ?? ''
   }
   get demand_amount(): string{
       return this.dto?.demand_amount ?? ''
   }
   get amount(): string{
       return this.dto?.amount ?? ''
   }
   get cm_id(): string{
       return this.dto?.cm_id ?? ''
   }
   get emp_name(): string{
       return this.dto?.emp_name ?? ''
   }
   get party_name(): any{
       return this.dto?.party_name ?? ''
   }
   get expense_label(): string{
       return this.dto?.expense_label ?? ''
   }
    get expTrans(): ExpTranList{
       return new ExpTranList(this.dto?.expTrans)
    }
}
