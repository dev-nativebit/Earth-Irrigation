import {Entity} from "@/model/core";
import { ExpTranDto} from "@/dtos";

export class ExpTranModel extends Entity<ExpTranDto>{
    constructor(dto: ExpTranDto) {
        super(dto,'id');
    }

    get id(): string{
        return this.dto?.id ?? ''
    }
    get exp_id(): string{
        return this.dto?.exp_id ?? ''
    }
    get exp_type_id(): string{
        return this.dto?.exp_type_id ?? ''
    }
    get amount(): string{
        return this.dto?.amount ?? ''
    }
    get approve_amount(): string{
        return this.dto?.approve_amount ?? ''
    }
    get approve_remark(): string{
        return this.dto?.approve_remark ?? ''
    }
    get created_by(): string{
        return this.dto?.created_by ?? ''
    }
    get created_at(): string{
        return this.dto?.created_at ?? ''
    }
    get updated_by(): string{
        return this.dto?.updated_by ?? ''
    }
    get updated_at(): string{
        return this.dto?.updated_at ?? ''
    }
    get is_delete(): string{
        return this.dto?.is_delete ?? ''
    }
    get cm_id(): string{
        return this.dto?.cm_id ?? ''
    }
    get expense_label(): string{
        return this.dto?.expense_label ?? ''
    }
    get exp_date(): string{
        return this.dto?.exp_date ?? ''
    }
   get travel_by(): string{
        return this.dto.travel_by ?? ''
   }
   get travel_distance(): string{
        return this.dto.travel_distance ?? ''
   }
}

