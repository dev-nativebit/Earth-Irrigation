import {AppointmentDto} from "@/dtos";
import {Entity} from "@/model/core";

export class AppointmentModel extends Entity<AppointmentDto>{
    public constructor(dto: AppointmentDto) {
        super(dto, "id");
    }

    get id(): string{
        return this.dto.id ?? ''
    }
    get lead_stage(): string{
        return this.dto?.lead_stage ?? ''
    }
    get party_id(): string{
        return this.dto?.party_id ?? ''
    }
    get ref_id(): string{
        return this.dto?.ref_id ?? ''
    }
    get ref_date(): string{
        return this.dto?.ref_date ?? ''
    }
    get ref_no(): string{
        return this.dto?.ref_no ?? ''
    }
    get mode(): string{
        return this.dto.mode ?? ''
    }
    get notes(): string{
        return this.dto.notes ?? ''
    }
    get response(): string{
        return this.dto?.response ?? ''
    }
    get remark(): string{
        return this.dto?.remark ?? ''
    }
    get voice_notes(): string{
        return this.dto?.voice_notes ?? ''
    }
    get created_by_name(): string{
        return this.dto?.created_by_name ?? ''
    }
}
