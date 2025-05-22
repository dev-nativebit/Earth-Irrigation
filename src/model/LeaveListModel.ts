import {Entity} from "@/model/core";
import {LeaveListDto} from "@/dtos";

export class LeaveListModel extends Entity<LeaveListDto>{
    public constructor(dto: LeaveListDto) {
        super(dto,'id');
    }
    get id():string{
        return this.dto?.id ?? ''
    }
    get trans_no():string{
        return this.dto?.trans_no ?? ''
    }
    get leave_type():string{
        return this.dto?.leave_type ?? ''
    }
    get start_date():string{
        return this.dto?.start_date ?? ''
    }
    get start_section():string{
        return this.dto?.start_section ?? ''
    }
    get end_date():string{
        return this.dto?.end_date ?? ''
    }
    get end_section():string{
        return this.dto?.end_section ?? ''
    }
    get total_days():string{
        return this.dto?.total_days ?? ''
    }
    get leave_reason():string{
        return this.dto?.leave_reason ?? ''
    }
    get status():string{
        return this.dto?.status ?? ''
    }
    get emp_name():string{
        return this.dto?.emp_name ?? ''
    }
    get emp_code():string{
        return this.dto?.emp_code ?? ''
    }
    get dsg_title():string{
        return this.dto?.dsg_title ?? ''
    }
    get auth_notes():string{
        return this.dto?.auth_notes ?? ''
    }
    get auth_by():string{
        return this.dto?.auth_by ?? ''
    }
    get proof_file():string{
        return this.dto?.proof_file ?? ''
    }
    get status_label():string{
        return this.dto?.status_label ?? ''
    }
}
