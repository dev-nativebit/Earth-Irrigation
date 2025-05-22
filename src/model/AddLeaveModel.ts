import {Entity} from "@/model/core";
import {AddLeaveDto} from "@/dtos";

export class AddLeaveModel extends Entity<AddLeaveDto>{
    constructor(dto: AddLeaveDto) {
        super(dto,'id');
    }
    get id(): string{
        return this.dto?.id ?? ''
    }
    get emp_code(): string{
        return this.dto?.emp_code ?? ''
    }
    get emp_name(): string{
        return this.dto?.emp_name ?? ''
    }
}
