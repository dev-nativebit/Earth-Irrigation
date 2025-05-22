import {Entity} from "@/model/core";
import {GetRequestListDto} from "@/dtos";

export class GetRequestModel extends Entity<GetRequestListDto>{
    constructor(dto: GetRequestListDto) {
        super(dto, 'id');
    }

    get id(): string{
        return this.dto?.id ?? ''
    }
    get notes(): any{
        return this.dto?.notes ?? ''
    }
    get status(): string{
        return this.dto?.status ?? ''
    }
    get emp_code(): string{
        return this.dto?.emp_code ?? ''
    }
    get emp_name(): string{
        return this.dto?.emp_name ?? ''
    }
    get designation_name(): string{
        return this.dto?.designation_name ?? ''
    }
    get department_name(): string{
        return this.dto?.department_name ?? ''
    }
    get hq_name(): string{
        return this.dto?.hq_name ?? ''
    }
    get new_hq_name(): string{
        return this.dto?.new_hq_name ?? ''
    }
}
